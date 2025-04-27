import { useWebSocket } from "@hooks/ws/useWebSocket";
import { PlayerJwtInfo } from "@models/PlayerJwtInfo";
import { AllWebSocketEventResponse } from "@models/Response/ws/all/AllWebSocketEventResponse";
import { HostDisconnectedEventResponse } from "@models/Response/ws/all/HostDisconnectedEventResponse";
import { PlayerWebSocketEventResponse } from "@models/Response/ws/player/PlayerWebSocketEventResponse";
import { Cookies } from "react-cookie";

interface PlayerWebSocketConfig {
  onHostDisconnectedEvent: (
    eventResponse: HostDisconnectedEventResponse,
  ) => void;
}

const usePlayerWebSocket = ({
  onHostDisconnectedEvent,
}: PlayerWebSocketConfig) => {
  const {
    initializeWebSocketClient,
    subscribeToTopic,
    isConnected,
    messages,
    deactivateConnection,
  } = useWebSocket();

  const subscribeToPlayerTopics = (playerJwt: PlayerJwtInfo) => {
    subscribeToTopic<PlayerWebSocketEventResponse>(
      `/topic/session/${playerJwt.quizSessionId}/players`,
      (eventResponse) => {
        switch (eventResponse.event) {
          default:
            console.warn(
              `Unhandled broker event ${eventResponse.event} - ${eventResponse.timestamp}`,
            );
        }
      },
    );

    subscribeToTopic<AllWebSocketEventResponse>(
      `/topic/session/${playerJwt.quizSessionId}/all`,
      (eventResponse) => {
        switch (eventResponse.event) {
          case "host_disconnected":
            onHostDisconnectedEvent(eventResponse);
            break;
          default:
            console.warn(
              `Unhandled broker event ${eventResponse.event} - ${eventResponse.timestamp}`,
            );
        }
      },
    );
  };

  const initializePlayerWebSocketClient = (playerJwt: PlayerJwtInfo) => {
    const cookies = new Cookies();
    const authorizationHeader = cookies.get("QuizSessionJwt");
    initializeWebSocketClient(
      `Bearer ${authorizationHeader}`,
      () => {
        subscribeToPlayerTopics(playerJwt);
      },
      () => {},
    );
  };

  return {
    initializePlayerWebSocketClient,
    isConnected,
    messages,
    deactivateConnection,
  };
};

export default usePlayerWebSocket;
