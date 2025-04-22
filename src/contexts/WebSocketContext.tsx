import { createContext, ReactNode, useContext } from "react";
import { useWebSocket, WebSocketConfig } from "@hooks/context/useWebSocket";

interface WebSocketProviderProps {
  children: ReactNode;
  config?: WebSocketConfig;
}

const WebSocketContext = createContext<ReturnType<typeof useWebSocket> | null>(
  null,
);

export const WebSocketProvider = ({
  children,
  config = {},
}: WebSocketProviderProps) => {
  const ws = useWebSocket(config);
  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context)
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider",
    );
  return context;
};
