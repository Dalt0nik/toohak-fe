import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { useQuiz } from "@hooks/useQuiz";
import useHostWebSocket from "@hooks/ws/useHostWebSocket";
import { QuizSessionStatus } from "@models/QuizSessionState";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { Box, Container } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import HostQuizSessionLobby from "./HostQuizSessionLobby/HostQuizSessionLobby";
import HostQuizSessionQuestion from "@pages/QuizSessionPage/Host/HostQuizSessionQuestion/HostQuizSessionQuestion";
import MusicBar from "@components/MusicBar";
import HostQuizSessionAnswered from "./HostQuizSessionAnswered/HostQuizSessionAnswered";
import { WsEventRoundEnd } from "@models/Response/ws/all/WsEventRoundEnd";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { HostSessionActionTypes } from "@models/hostSessionTypes";
import { useHostSessionContext } from "@hooks/context/useHostSessionContext";
import { HostSessionComponentEventNewQuestion } from "@models/hostSessionTypes";

interface HostQuizSessionProps {
  joinId: string;
}

/**
 * Main component responsible for creating websocket connection for a host to quiz session and handling session status(state) logic
 */
const HostQuizSession = ({ joinId }: HostQuizSessionProps) => {
  const [{ correctQuestionOption, currentQuestion, status }, dispatch] =
    useHostSessionContext();
  const { init, isConnected, deactivateConnection } = useHostWebSocket({
    onHostDisconnected: () => deactivateConnection(),
    onPlayerJoined: (event: WsEventPlayerJoined) => {
      dispatch({ payload: event });
    },
    onPlayerDisconnected: (event: WsEventPlayerDisconnected) => {
      dispatch({ payload: event });
    },
    onRoundEnd: (event: WsEventRoundEnd) => {
      dispatch({ payload: event });
    },
  });

  const qc = useQueryClient();
  //get from cache with an assumption that QuizSessionPage fetches session data
  const session = qc.getQueryData<QuizSessionResponse>(["session", joinId])!;
  const { data: quizData, isLoading: isQuizLoading } = useQuiz(session.quizId);

  useEffect(() => {
    // Init if included makes too many calls
    init(session.quizSessionId);
    return () => {
      deactivateConnection();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.quizSessionId]);

  if (isQuizLoading && !isConnected) {
    return <LoadingBackdrop />;
  }

  const handleNewQuestion = () => {
    dispatch({
      payload: {
        questions: quizData!.questions,
        event: HostSessionActionTypes.NEW_QUESTION,
      } as HostSessionComponentEventNewQuestion,
    });
  };

  return (
    <Container>
      {status === QuizSessionStatus.PENDING && (
        <HostQuizSessionLobby
          sessionData={session}
          quizData={quizData!}
          onSuccessfulStart={handleNewQuestion}
        />
      )}

      {currentQuestion && status == QuizSessionStatus.ACTIVE && (
        <HostQuizSessionQuestion />
      )}
      {currentQuestion &&
        correctQuestionOption &&
        status == QuizSessionStatus.ROUND_END && (
          <HostQuizSessionAnswered
            sessionId={session.quizSessionId}
            numberOfQuestions={quizData!.questions.length}
            onNextQuestionSuccess={handleNewQuestion}
          />
        )}
      <Box width="100%" display="flex">
        <MusicBar />
      </Box>
    </Container>
  );
};

export default HostQuizSession;
