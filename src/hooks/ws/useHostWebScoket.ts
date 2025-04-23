import { useAuth0 } from "@auth0/auth0-react";
import { useWebSocket } from "@hooks/ws/useWebSocket";
import { HostWebSocketEventMessage } from "@models/Response/ws/host/HostWebSocketEventResponse";
import { PlayerJoinedEventMessage } from "@models/Response/ws/host/PlayerJoinedEventResponse";
import { HostDisconnectedEventResponse } from "@models/Response/ws/all/HostDisconnectedEventResponse";
import { PlayerDisconnectedEventResponse } from "@models/Response/ws/host/PlayerDisconnectedEventResponse";
import { AllWebSocketEventResponse } from "@models/Response/ws/all/AllWebSocketEventResponse";

interface useHostWebSocketProps {
  onPlayerJoinedEvent: (eventResponse: PlayerJoinedEventMessage) => void;
  onPlayerDisconnectedEvent: (
    eventResponse: PlayerDisconnectedEventResponse,
  ) => void;
  onHostDisconnectedEvent: (
    eventResponse: HostDisconnectedEventResponse,
  ) => void;
}

const useHostWebSocket = ({
  onPlayerJoinedEvent,
  onPlayerDisconnectedEvent,
  onHostDisconnectedEvent,
}: useHostWebSocketProps) => {
  const {
    initializeWebSocketClient,
    subscribeToTopic,
    isConnected,
    messages,
    deactivateConnection,
  } = useWebSocket();
  const { getAccessTokenSilently } = useAuth0();

  const subscribeToHostTopics = async (sessionId: string) => {
    subscribeToTopic<HostWebSocketEventMessage>(
      `/topic/session/${sessionId}/host`,
      (eventResponse) => {
        switch (eventResponse.event) {
          case "player_joined":
            onPlayerJoinedEvent(eventResponse as PlayerJoinedEventMessage);
            break;
          case "player_disconnected":
            onPlayerDisconnectedEvent(
              eventResponse as PlayerDisconnectedEventResponse,
            );
            break;
          default:
            console.warn(
              `Unhandled broker event ${eventResponse.event} - ${eventResponse.timestamp}`,
            );
        }
      },
    );

    subscribeToTopic<AllWebSocketEventResponse>(
      `/topic/session/${sessionId}/all`,
      (eventResponse) => {
        switch (eventResponse.event) {
          case "host_disconnected":
            onHostDisconnectedEvent(
              eventResponse as HostDisconnectedEventResponse,
            );
            break;
          default:
            console.warn(
              `Unhandled broker event ${eventResponse.event} - ${eventResponse.timestamp}`,
            );
        }
      },
    );
  };

  const initializePlayerWebSocketClient = async (sessionId: string) => {
    return initializeWebSocketClient(
      `Bearer ${await getAccessTokenSilently()}`,
      () => {
        subscribeToHostTopics(sessionId);
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

export default useHostWebSocket;
