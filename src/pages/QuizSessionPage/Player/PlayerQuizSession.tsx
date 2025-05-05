import { usePlayerJwt } from "@hooks/usePlayerJwt";
import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import PlayerQuizSessionQuestion from "@pages/QuizSessionPage/Player/PlayerQuizSessionQuestion/PlayerQuizSessionQuestion";

/**
 * Main component responsible for connecting player quiz session UI and websocket connection
 */
const PlayerQuizSession = () => {
  const playerJwt = usePlayerJwt();
  const {
    initializePlayerWebSocketClient,
    messages,
    isConnected,
    deactivateConnection,
  } = usePlayerWebSocket({
    onHostDisconnectedEvent: () => {},
  });

  useEffect(() => {
    if (playerJwt) initializePlayerWebSocketClient(playerJwt);
  }, [playerJwt]);

  const mockQuestion = {
    id: "bf49c767-92f9-446b-8fe8-a8317135f60e",
    quizId: "6af3fbac-7086-45ab-8b9d-1ad68508d92a",
    imageId: "",
    title: "How are you doing?",
    questionOptions: [
      {
        id: "c65b862e-c72a-4d47-a103-b74313e83a9f",
        questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
        title: "1234567890",
        ordering: 1,
        isCorrect: true,
      },
      {
        id: "f31c87cf-d33f-4d16-b2ba-33b17c5ce142",
        questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
        title: "12345678901234567890123456789012345678901234567890",
        ordering: 2,
        isCorrect: false,
      },
      {
        id: "863544c5-83b1-4b76-88ee-11ee75395dd6",
        questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
        title:
          "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        ordering: 3,
        isCorrect: false,
      },
      {
        id: "bec286e1-69a7-4383-965c-45f97dbcd322",
        questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
        title:
          "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        ordering: 4,
        isCorrect: false,
      },
    ],
  };

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
      {/* TODO: Remove in a long run. Temporary for testing */}
      <Box>
        {isConnected ? (
          <button onClick={deactivateConnection}>Disconnect</button>
        ) : (
          <button onClick={() => initializePlayerWebSocketClient(playerJwt!)}>
            Reconnect
          </button>
        )}
      </Box>
      {/* VERY TEMPORARY */}
      <PlayerQuizSessionQuestion question={mockQuestion} questionNumber={1} />
    </Container>
  );
};

export default PlayerQuizSession;
