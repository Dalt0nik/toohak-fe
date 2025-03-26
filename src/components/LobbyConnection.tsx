import { useWebSocketContext } from "../contexts/WebSocketContext";

const LobbyConnection: React.FC = () => {
  const {
    messages,
    lobbyId,
    setLobbyId,
    answer,
    setAnswer,
    subscribeToLobby,
    sendAnswer,
  } = useWebSocketContext();

  return (
    <div>
      <h2>Join Lobby</h2>
      <div>
        <input
          placeholder="Enter lobby code"
          value={lobbyId}
          onChange={(e) => setLobbyId(e.target.value)}
        />
        <button onClick={() => subscribeToLobby(lobbyId)}>Subscribe</button>
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
        <button onClick={sendAnswer}>Send</button>
      </div>
    </div>
  );
};

export default LobbyConnection;
