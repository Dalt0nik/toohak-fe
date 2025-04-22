import useHostWebSocket from "@hooks/ws/useHostWebScoket";
import { useEffect } from "react";

interface HostQuizSessionProps {
  sessionId: string;
}

const HostQuizSession = ({ sessionId }: HostQuizSessionProps) => {
  const { initializePlayerWebSocketClient, messages, isConnected } =
    useHostWebSocket({
      onHostDisconnectedEvent: () => {},
      onPlayerDisconnectedEvent: () => {},
      onPlayerJoinedEvent: () => {},
    });

  useEffect(() => {
    initializePlayerWebSocketClient(sessionId);
  }, []);

  console.log(isConnected, messages);

  return (
    <div>
      {isConnected && messages.length
        ? messages.map((message, id) => (
            <pre key={id}>{JSON.stringify(message.body, null, 2)}</pre>
          ))
        : "No messages"}
    </div>
  );
};

export default HostQuizSession;
