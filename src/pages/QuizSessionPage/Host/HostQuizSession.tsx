import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { useQuiz } from "@hooks/useQuiz";
import useHostWebSocket from "@hooks/ws/useHostWebSocket";
import { QuizSessionStatus } from "@models/QuizSessionState";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { Box, Container } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HostQuizSessionLobby from "./HostQuizSessionLobby/HostQuizSessionLobby";
import HostQuizSessionQuestion from "@pages/QuizSessionPage/Host/HostQuizSessionQuestion/HostQuizSessionQuestion";
import MusicBar from "@components/MusicBar";
import { WsEventNewQuestion } from "@models/Response/ws/all/WsEventNewQuestion";
import HostQuizSessionAnswered from "./HostQuizSessionAnswered/HostQuizSessionAnswered";
import { WsEventRoundEnd } from "@models/Response/ws/all/WsEventRoundEnd";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsPlayer } from "@models/Response/ws/all/WsPlayer";
import { WsQuestion } from "@models/Response/ws/player/WsQuestion";

interface HostQuizSessionProps {
  joinId: string;
}

/**
 * Main component responsible for creating websocket connection for a host to quiz session and handling session status(state) logic
 */
const HostQuizSession = ({ joinId }: HostQuizSessionProps) => {
  const { init, isConnected, deactivateConnection } = useHostWebSocket({
    onHostDisconnected: () => deactivateConnection(),
    onPlayerJoined: (event: WsEventPlayerJoined) => {
      setPlayerCount((prev) => prev + 1);
      const setInitialScores = (playerScores: WsPlayer[]) => {
        if (
          playerScores.some((player) => player.userId === event.player.userId)
        )
          return playerScores;
        return [...playerScores, { ...event.player, score: 0 }];
      };
      setOldScores(setInitialScores);
      setNewScores(setInitialScores);
    },
    onPlayerDisconnected: () => setPlayerCount((prev) => Math.max(0, prev - 1)),
    onRoundEnd: (event: WsEventRoundEnd) => {
      setStatus(QuizSessionStatus.ROUND_END);
      setCorrectQuestionOption(event.answer);
      setNewScores((prev) => {
        setOldScores(prev);
        return event.players;
      });
    },
    onNewQuestion: (event: WsEventNewQuestion) => {
      setCurrentQuestion(event.question);
      setStatus(QuizSessionStatus.ACTIVE);
      setQuestionNumber((prev) => prev + 1);
      setCorrectQuestionOption("");
    },
  });

  const qc = useQueryClient();
  //get from cache with an assumption that QuizSessionPage fetches session data
  const session = qc.getQueryData<QuizSessionResponse>(["session", joinId])!;
  const { data: quizData, isLoading: isQuizLoading } = useQuiz(session.quizId);

  const [playerCount, setPlayerCount] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);

  const [status, setStatus] = useState<QuizSessionStatus>(session.status);

  const [currentQuestion, setCurrentQuestion] = useState<WsQuestion | null>(
    null,
  );
  const [correctQuestionOption, setCorrectQuestionOption] =
    useState<string>("");

  const [newScores, setNewScores] = useState<WsPlayer[]>([]);
  const [oldScores, setOldScores] = useState<WsPlayer[]>([]);

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

  const handleCurrentSessionStateChange = (newState: QuizSessionStatus) => {
    setStatus(newState);
  };

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
        {currentQuestion &&
        correctQuestionOption &&
        status == QuizSessionStatus.ROUND_END && (
          <HostQuizSessionAnswered
            correctQuestionOption={correctQuestionOption}
            sessionId={session.quizSessionId}
            question={currentQuestion}
            questionNumber={questionNumber}
            oldScores={oldScores.map((playerScore) => ({
              id: playerScore.userId,
              nickname: playerScore.nickname,
              score: playerScore.score,
            }))}
            newScores={newScores.map((playerScore) => ({
              id: playerScore.userId,
              nickname: playerScore.nickname,
              score: playerScore.score,
            }))}
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
