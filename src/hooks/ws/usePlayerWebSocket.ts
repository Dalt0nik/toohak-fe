import { useWebSocket } from "@hooks/ws/useWebSocket";
import { AllWebSocketEventResponse } from "@models/Response/ws/all/AllWebSocketEventResponse";
import { HostDisconnectedEventResponse } from "@models/Response/ws/all/HostDisconnectedEventResponse";
import { PlayerWebSocketEventResponse } from "@models/Response/ws/player/PlayerWebSocketEventResponse";
import { SpringJwtInfo } from "@models/SpringJwtInfo";
import { Cookies } from "react-cookie";

interface PlayerWebSocketConfig {
  playerJwt: SpringJwtInfo;
  onHostDisconnectedEvent: (
    eventResponse: HostDisconnectedEventResponse,
  ) => void;
}

const usePlayerWebSocket = ({
  playerJwt,
  onHostDisconnectedEvent,
}: PlayerWebSocketConfig) => {
  const {
    initializeWebSocketClient,
    subscribeToTopic,
    isConnected,
    messages,
    deactivateConnection,
  } = useWebSocket();

  const subscribeToPlayerTopics = () => {
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

  const initializePlayerWebSocketClient = () => {
    console.log("Hello?");
    const cookies = new Cookies();
    const authorizationHeader = cookies.get("QuizSessionJwt");
    initializeWebSocketClient(
      authorizationHeader,
      () => {
        subscribeToPlayerTopics();
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
