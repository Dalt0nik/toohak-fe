import { useWebSocket } from "@hooks/ws/useWebSocket";
import { AllEventTypes, WsEventAll } from "@models/Response/ws/all/WsEventAll";
import { WsEventHostDisconnected } from "@models/Response/ws/all/WsEventHostDisconnected";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsEventPlayer } from "@models/Response/ws/player/WsEventPlayer";
import { Cookies } from "react-cookie";

interface Handlers {
  onPlayerJoined: (evt: WsEventPlayerJoined) => void;
  onPlayerDisconnected: (evt: WsEventPlayerDisconnected) => void;
  onHostDisconnected: (evt: WsEventHostDisconnected) => void;
}

const usePlayerWebSocket = (handlers: Handlers) => {
  const {
    initializeWebSocketClient,
    subscribeToTopic,
    isConnected,
    messages,
    deactivateConnection,
  } = useWebSocket();

  const dispatchForWsAll = (event: WsEventAll) => {
    switch (event.event) {
      case AllEventTypes.PLAYER_JOINED:
        return handlers.onPlayerJoined(event);
      case AllEventTypes.PLAYER_DISCONNECTED:
        return handlers.onPlayerDisconnected(event);
      case AllEventTypes.HOST_DISCONNECTED:
        return handlers.onHostDisconnected(event);
    }
  };

  const dispatchForWsPlayer = () => {};

  const subscribeToAllTopics = (sessionId: string) => {
    subscribeToTopic<WsEventAll>(
      `/topic/session/${sessionId}/all`,
      dispatchForWsAll,
    );
  };

  const subscribeToPlayerTopics = (sessionId: string) => {
    subscribeToTopic<WsEventPlayer>(
      `/topic/session/${sessionId}/players`,
      dispatchForWsPlayer,
    );
  };

  const init = async (sessionId: string) => {
    const cookies = new Cookies();
    const authorizationHeader = cookies.get("QuizSessionJwt");
    return initializeWebSocketClient(
      `Bearer ${authorizationHeader}`,
      () => {
        subscribeToAllTopics(sessionId);
        subscribeToPlayerTopics(sessionId);
      },
      () => {},
    );
  };

  return {
    init,
    isConnected,
    messages,
    deactivateConnection,
  };
};

export default usePlayerWebSocket;
