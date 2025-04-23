import useHostWebSocket from "@hooks/ws/useHostWebScoket";
import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";

interface HostQuizSessionProps {
  sessionId: string;
}

/**
 * Main component responsible for connecting host quiz session UI and websocket connection
 */
const HostQuizSession = ({ sessionId }: HostQuizSessionProps) => {
  const {
    initializePlayerWebSocketClient,
    messages,
    isConnected,
    deactivateConnection,
  } = useHostWebSocket({
    onHostDisconnectedEvent: () => {},
    onPlayerDisconnectedEvent: () => {},
    onPlayerJoinedEvent: () => {},
  });

  useEffect(() => {
    initializePlayerWebSocketClient(sessionId);
  }, []);

  return (
    <Container>
      <Box>
        {isConnected && messages.length
          ? messages.map((message, id) => (
              <Typography key={id}>
                <pre style={{ whiteSpace: "wrap" }}>
                  {JSON.stringify(message.body, null, 2)}
                </pre>
              </Typography>
            ))
          : "No messages"}
      </Box>
      {/* TODO: Remove in a long run. Temporary for testing */}
      <Box>
        {isConnected ? (
          <button onClick={deactivateConnection}>Disconnect</button>
        ) : (
          <button onClick={() => initializePlayerWebSocketClient(sessionId)}>
            Reconnect
          </button>
        )}
      </Box>
    </Container>
  );
};

export default HostQuizSession;
