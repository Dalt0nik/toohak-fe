import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { useQuiz } from "@hooks/useQuiz";
import useHostWebSocket from "@hooks/ws/useHostWebScoket";
import { QuizSessionStatus } from "@models/QuizSessionState";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { Container } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HostQuizSessionLobby from "./HostQuizSessionLobby/HostQuizSessionLobby";
import HostQuizSessionQuestion from "@pages/QuizSessionPage/Host/HostQuizSessionQuestion/HostQuizSessionQuestion";

interface HostQuizSessionProps {
  joinId: string;
}

/**
 * Main component responsible for creating websocket connection for a host to quiz session and handling session status(state) logic
 */
const HostQuizSession = ({ joinId }: HostQuizSessionProps) => {
  const { initializeHostWebSocketClient, isConnected } = useHostWebSocket({
    onHostDisconnectedEvent: () => {},
    onPlayerDisconnectedEvent: () => {
      setPlayerCount((prev) => prev - 1);
    },
    onPlayerJoinedEvent: () => {
      setPlayerCount((prev) => prev + 1);
    },
  });

  const queryClient = useQueryClient();

  //get from cache with an assumption that QuizSessionPage fetches session data
  const session = queryClient.getQueryData([
    "session",
    joinId,
  ]) as QuizSessionResponse;

  const { data: quizData, isLoading: isQuizLoading } = useQuiz(session.quizId);

  const [currentSessionStatus, setCurrentSessionStatus] =
    useState<QuizSessionStatus>(session.status);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    initializeHostWebSocketClient(session.quizSessionId);
  }, [session.quizSessionId]);

  if (isQuizLoading && !isConnected) {
    return <LoadingBackdrop />;
  }

  const handleCurrentSessionStateChange = (newState: QuizSessionStatus) => {
    setCurrentSessionStatus(newState);
  };

  //TEMP
  const currentQuestion = quizData!.questions[0];
  const questionNumber = 1;
  return (
    <Container>
      {currentSessionStatus === QuizSessionStatus.PENDING && (
        <HostQuizSessionLobby
          playerCount={playerCount}
          sessionData={session}
          quizData={quizData!}
          onChangeSessionStatus={handleCurrentSessionStateChange}
        />
      )}

      {currentQuestion && currentSessionStatus == QuizSessionStatus.ACTIVE && (
        <HostQuizSessionQuestion
          question={currentQuestion}
          questionNumber={questionNumber}
        />
      )}
    </Container>
  );
};

export default HostQuizSession;
