import React, { useEffect, useState, useRef } from "react";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_URL = "http://localhost:8080/ws"; // WebSocket endpoint defined in BE

const LobbyConnection: React.FC = () => {
  const [lobbyId, setLobbyId] = useState("");
  const [subscribedLobby, setSubscribedLobby] = useState("");
  const [playerId, setPlayerId] = useState(
    "player-" + Math.floor(Math.random() * 1000),
  );
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);

  // Setup STOMP client only once
  useEffect(() => {
    const socket = new SockJS(WS_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const handleSubscribe = () => {
    if (!lobbyId || !stompClientRef.current?.connected) return;

    // Unsubscribe from previous
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    subscriptionRef.current = stompClientRef.current.subscribe(
      `/topic/lobby/${lobbyId}`,
      (message: IMessage) => {
        try {
          console.log("Received message:", message.body);
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

    setSubscribedLobby(lobbyId);
  };

  const handleSendAnswer = () => {
    if (
      !subscribedLobby ||
      !stompClientRef.current?.connected ||
      !answer.trim()
    )
      return;

    const payload = {
      lobbyId: subscribedLobby,
      playerId: playerId,
      answer: answer,
    };

    stompClientRef.current.publish({
      destination: "/app/answer",
      body: JSON.stringify(payload),
    });

    setAnswer("");
  };

  return (
    <div>
      <h2>Join Lobby</h2>
      <div>
        <input
          placeholder="Enter lobby code"
          value={lobbyId}
          onChange={(e) => setLobbyId(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>

      <h3>Messages</h3>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <div>
        <h3>Send Answer</h3>
        <input
          placeholder="Type your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleSendAnswer}>Send</button>
      </div>
    </div>
  );
};

export default LobbyConnection;
