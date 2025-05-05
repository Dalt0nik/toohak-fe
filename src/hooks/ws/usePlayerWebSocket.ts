import { useWebSocket } from "@hooks/ws/useWebSocket";
import { PlayerJwtInfo } from "@models/PlayerJwtInfo";
import { AllWebSocketEventResponse } from "@models/Response/ws/all/AllWebSocketEventResponse";
import { HostDisconnectedEventResponse } from "@models/Response/ws/all/HostDisconnectedEventResponse";
import {
  PlayerWebSocketEventResponse,
  PlayerEventType,
} from "@models/Response/ws/player/PlayerWebSocketEventResponse";
import { Cookies } from "react-cookie";
import { QuestionResponse } from "@models/Response/ws/player/QuestionSessionResponse";
import { PlayerNewQuestionEventResponse } from "@models/Response/ws/player/PlayerNewQuestionEventResponse";

interface PlayerWebSocketConfig {
  onHostDisconnectedEvent: (
    eventResponse: HostDisconnectedEventResponse,
  ) => void;
  onNewQuestionEvent?: (question: QuestionResponse) => void;
}

const usePlayerWebSocket = ({
  onHostDisconnectedEvent,
  onNewQuestionEvent,
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
          case PlayerEventType.NEW_QUESTION: {
            const { question } =
              eventResponse as PlayerNewQuestionEventResponse;
            onNewQuestionEvent?.(question);
            break;
          }
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
          case "host_disconnected": {
            onHostDisconnectedEvent(eventResponse);
            break;
          }
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
