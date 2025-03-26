import { useEffect, useRef, useState } from "react";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_URL = "http://localhost:8080/api/ws";

export const useWebSocket = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [subscribedLobby, setSubscribedLobby] = useState("");
  const [lobbyId, setLobbyId] = useState("");
  const [answer, setAnswer] = useState("");
  const playerId = useRef("player-" + Math.floor(Math.random() * 1000)).current;

  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    const socket = new SockJS(WS_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => console.log("Connected to WebSocket"),
      onDisconnect: () => console.log("Disconnected from WebSocket"),
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const subscribeToLobby = (id: string) => {
    if (!id || !stompClientRef.current?.connected) return;

    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    subscriptionRef.current = stompClientRef.current.subscribe(
      `/topic/lobby/${id}`,
      (message: IMessage) => {
        try {
          const body = JSON.parse(message.body);
          setMessages((prev) => [
            ...prev,
            `New question: ${body.question} (Lobby: ${body.lobbyId})`,
          ]);
        } catch {
          setMessages((prev) => [...prev, `Message: ${message.body}`]);
        }
      },
    );

    setSubscribedLobby(id);
  };

  const sendAnswer = () => {
    if (
      !subscribedLobby ||
      !stompClientRef.current?.connected ||
      !answer.trim()
    )
      return;

    const payload = {
      lobbyId: subscribedLobby,
      playerId,
      answer,
    };

    stompClientRef.current.publish({
      destination: "/app/answer",
      body: JSON.stringify(payload),
    });

    setAnswer("");
  };

  return {
    messages,
    lobbyId,
    setLobbyId,
    subscribedLobby,
    answer,
    setAnswer,
    subscribeToLobby,
    sendAnswer,
  };
};
