import { useEffect, useRef } from "react";
import {
  Client,
  IMessage,
  StompHeaders,
  StompSubscription,
} from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_CONFIG = {
  url: import.meta.env.VITE_WS_CONFIG_URL,
  reconnectDelay: import.meta.env.VITE_WS_CONFIG_RECONNECTION_DELAY,
};

export interface WebSocketConfig {
  authorizationHeader?: string;
}

/**
 * Instead of using this directly, use `WebSocketContext` which implements `useWebSocket`. This hook immediately establishes a connection based on predefined .ENV vars.
 * @param {WebSocketConfig} config - mainly is used to set `authorizationHeader` value. It is used when establishing a connection for authorization.
 */
export const useWebSocket = (config: WebSocketConfig) => {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());

  useEffect(() => {
    const disconnect = initializeWebSocketClient();
    return disconnect;
  }, []);

  const initializeWebSocketClient = () => {
    const socket = new SockJS(WS_CONFIG.url);
    const stompHeaders = new StompHeaders();

    if (config.authorizationHeader)
      stompHeaders["Authorization"] = config?.authorizationHeader;

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: WS_CONFIG.reconnectDelay,
      onConnect: () => console.log("Connected to WebSocket"),
      onDisconnect: () => console.log("Disconnected from WebSocket"),
      connectHeaders: stompHeaders,
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  };

  /**
   * Subscribes to a certain topic.
   * @param {string} brokerPath - Receive messages from this message broker path. `brokerPath` should follow this format - `/topic/lobby/`. The client will listen to this broker for messages.
   * @param {string} handleMessageCallback - this will be callbacked when a message is received
   */
  const subscribeToTopic = (
    brokerPath: string,
    handleMessageCallback: (message: IMessage) => void,
  ) => {
    if (!stompClientRef.current?.connected) return;

    const subscription = subscriptionsRef.current.get(brokerPath);

    if (subscription) {
      subscription.unsubscribe();
    }

    const newSubscription = stompClientRef.current.subscribe(
      brokerPath,
      handleMessageCallback,
    );

    subscriptionsRef.current.set(brokerPath, newSubscription);
  };

  const unsubscribeTopic = (brokerUrl: string) => {
    if (!stompClientRef.current?.connected) return;

    const subscription = subscriptionsRef.current.get(brokerUrl);

    if (subscription) subscription.unsubscribe();
  };

  /**
   * Send message to a certain .
   * @param {string} destinationPath - this path which BE listens to for messages from client. Example value - `/app/answer`
   * @param {string} payload - this is the payload that will be sent as a message to the appropriate message endpoint
   */
  const sendMessage = (
    destinationPath: string,
    payload: { [key: string]: string },
  ) => {
    if (!stompClientRef.current?.connected) return;

    stompClientRef.current.publish({
      destination: destinationPath,
      body: JSON.stringify(payload),
    });
  };

  return {
    subscribeToTopic,
    unsubscribeTopic,
    sendMessage,
  };
};
