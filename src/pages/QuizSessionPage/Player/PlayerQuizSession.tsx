import { usePlayerJwt } from "@hooks/usePlayerJwt";
import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import PlayerQuizSessionQuestion from "@pages/QuizSessionPage/Player/PlayerQuizSessionQuestion/PlayerQuizSessionQuestion";
import { QuestionResponse } from "@models/Response/ws/player/QuestionSessionResponse";

/**
 * Main component responsible for connecting player quiz session UI and websocket connection
 */
const PlayerQuizSession = () => {
  const playerJwt = usePlayerJwt();
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionResponse | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);

  const {
    initializePlayerWebSocketClient,
    messages,
    isConnected,
    deactivateConnection,
  } = usePlayerWebSocket({
    onHostDisconnectedEvent: () => {},
    onNewQuestionEvent: (question) => {
      setCurrentQuestion(question);
      setQuestionNumber((prev) => prev + 1);
    },
  });

  useEffect(() => {
    if (playerJwt) {
      initializePlayerWebSocketClient(playerJwt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerJwt]);

  return (
    <Container>
      <Box>
        {isConnected && messages.length
          ? messages.map((message, idx) => (
              <pre key={idx} style={{ whiteSpace: "wrap" }}>
                {JSON.stringify(message.body, null, 2)}
              </pre>
            ))
          : "No messages"}
      </Box>
      {/* TODO: Remove in the long run. Temporary for testing */}
      <Box>
        {isConnected ? (
          <button onClick={deactivateConnection}>Disconnect</button>
        ) : (
          <button onClick={() => initializePlayerWebSocketClient(playerJwt!)}>
            Reconnect
          </button>
        )}
      </Box>

      {currentQuestion && (
        <PlayerQuizSessionQuestion
          question={currentQuestion}
          questionNumber={questionNumber}
        />
      )}
    </Container>
  );
};

export default PlayerQuizSession;
