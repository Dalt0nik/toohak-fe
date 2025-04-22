import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import { useEffect } from "react";

const PlayerQuizSession = () => {
  const {
    initializePlayerWebSocketClient,
    messages,
    isConnected,
    deactivateConnection,
  } = usePlayerWebSocket({
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
