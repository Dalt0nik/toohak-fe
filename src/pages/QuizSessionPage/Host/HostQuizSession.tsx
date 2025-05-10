import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { useQuiz } from "@hooks/useQuiz";
import useHostWebSocket from "@hooks/ws/useHostWebScoket";
import { QuizSessionStatus } from "@models/QuizSessionState";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { Box, Container } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HostQuizSessionLobby from "./HostQuizSessionLobby/HostQuizSessionLobby";
import HostQuizSessionQuestion from "@pages/QuizSessionPage/Host/HostQuizSessionQuestion/HostQuizSessionQuestion";
import MusicBar from "@components/MusicBar";

interface HostQuizSessionProps {
  joinId: string;
}

/**
 * Main component responsible for creating websocket connection for a host to quiz session and handling session status(state) logic
 */
const HostQuizSession = ({ joinId }: HostQuizSessionProps) => {
  const { init, isConnected, deactivateConnection } = useHostWebSocket({
    onHostDisconnected: () => deactivateConnection(),
    onPlayerJoined: () => setPlayerCount((prev) => prev + 1),
    onPlayerDisconnected: () => setPlayerCount((prev) => Math.max(0, prev - 1)),
  });

  const qc = useQueryClient();
  //get from cache with an assumption that QuizSessionPage fetches session data
  const session = qc.getQueryData<QuizSessionResponse>(["session", joinId])!;
  const { data: quizData, isLoading: isQuizLoading } = useQuiz(session.quizId);
  const [playerCount, setPlayerCount] = useState(0);
  const [status, setStatus] = useState<QuizSessionStatus>(session.status);

  useEffect(() => {
    init(session.quizSessionId);
    // Init if included makes too many calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.quizSessionId]);

  if (isQuizLoading && !isConnected) {
    return <LoadingBackdrop />;
  }

  const handleCurrentSessionStateChange = (newState: QuizSessionStatus) => {
    setStatus(newState);
  };

  //TEMP
  const currentQuestion = quizData!.questions[0];
  const questionNumber = 1;
  return (
    <>
      <Container>
        {status === QuizSessionStatus.PENDING && (
          <HostQuizSessionLobby
            playerCount={playerCount}
            sessionData={session}
            quizData={quizData!}
            onChangeSessionStatus={handleCurrentSessionStateChange}
          />
        )}

        {currentQuestion && status == QuizSessionStatus.ACTIVE && (
          <HostQuizSessionQuestion
            question={currentQuestion}
            questionNumber={questionNumber}
          />
        )}
        <Box width="100%" display="flex">
          <MusicBar />
        </Box>
      </Container>
    </>
  );
};

export default HostQuizSession;
