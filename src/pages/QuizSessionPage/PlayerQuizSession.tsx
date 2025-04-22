import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import { SpringJwtInfo } from "@models/SpringJwtInfo";
import { useEffect } from "react";

interface PlayerQuizSessionProps {
  playerJwt: SpringJwtInfo;
}

const PlayerQuizSession = ({ playerJwt }: PlayerQuizSessionProps) => {
  const {
    initializePlayerWebSocketClient,
    messages,
    isConnected,
    deactivateConnection,
  } = usePlayerWebSocket({
    playerJwt,
    onHostDisconnectedEvent: () => {},
  });

  useEffect(() => {
    initializePlayerWebSocketClient();
  }, []);

  return (
    <div>
      {isConnected && messages.length
        ? messages.map((message) => (
            <pre>{JSON.stringify(message, null, 2)}</pre>
          ))
        : "No messages"}
      <div>
        <button onClick={deactivateConnection}>Disconnect</button>
      </div>
    </div>
  );
};

export default PlayerQuizSession;
