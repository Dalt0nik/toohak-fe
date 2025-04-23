import { usePlayerJwt } from "@hooks/usePlayerJwt";
import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";

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
    </Container>
  );
};

export default PlayerQuizSession;
