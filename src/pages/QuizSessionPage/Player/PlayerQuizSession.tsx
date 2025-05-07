import { usePlayerJwt } from "@hooks/usePlayerJwt";
import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import PlayerQuizSessionQuestion from "@pages/QuizSessionPage/Player/PlayerQuizSessionQuestion/PlayerQuizSessionQuestion";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { useQuery } from "@tanstack/react-query";
import { fetchConnectedUsers } from "@api/QuizSessionApi";
import { WsEventPlayerNewQuestion } from "@models/Response/ws/player/WsEventPlayerNewQuestion";
import { WsQuestion } from "@models/Response/ws/player/WsQuestion";
import PlayerJoinedList from "./PlayerQuizSessionQuestion/PlayerJoinedList";

/**
 * Main component responsible for connecting player quiz session UI and websocket connection
 */
const PlayerQuizSession = () => {
  const playerJwt = usePlayerJwt();
  const [players, setPlayers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<WsQuestion | null>(
    null,
  );
  const [questionNumber, setQuestionNumber] = useState(0);

  const { init, messages, isConnected, deactivateConnection } =
    usePlayerWebSocket({
      onHostDisconnected: () => {},
      onPlayerJoined: (evt: WsEventPlayerJoined) => {
        setPlayers((prev) =>
          prev.includes(evt.player.nickname)
            ? prev
            : [...prev, evt.player.nickname],
        );
      },
      onPlayerDisconnected: (evt: WsEventPlayerDisconnected) => {
        setPlayers((prev) => prev.filter((p) => p !== evt.player.nickname));
      },
      onNewQuestion: (evt: WsEventPlayerNewQuestion) => {
        setCurrentQuestion(evt.question);
        setQuestionNumber((prev) => prev + 1);
      },
    });

  const { data: connectedPlayers } = useQuery<string[]>({
    queryKey: ["sessionPlayers", playerJwt?.quizSessionId],
    queryFn: () => fetchConnectedUsers(),
    enabled: !!playerJwt?.quizSessionId,
    // Make sure not to cache the data on reload
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (playerJwt) {
      init(playerJwt.quizSessionId);
    }
    if (connectedPlayers && connectedPlayers.length > 0) {
      setPlayers((prev) => [
        ...prev,
        ...connectedPlayers.filter((name) => !prev.includes(name)),
      ]);
    }
    // Init if included makes too many calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerJwt, connectedPlayers]);

  const handleDisconnect = () => {
    deactivateConnection();
    setPlayers([]);
  };

  const handleReconnect = () => {
    init(playerJwt!.quizSessionId);
  };

  return (
    <Container>
      {!currentQuestion && (
        <PlayerJoinedList
          players={players}
          isConnected={isConnected}
          onDisconnect={handleDisconnect}
          onReconnect={handleReconnect}
        />
      )}

      {/* TODO: Remove in the long run. Temporary for testing */}
      {isConnected && messages.length
        ? messages.map((message, idx) => (
            <pre key={idx} style={{ whiteSpace: "wrap" }}>
              {JSON.stringify(message.body, null, 2)}
            </pre>
          ))
        : "No messages"}

      {currentQuestion && (
        <PlayerQuizSessionQuestion
          question={currentQuestion}
          questionNumber={questionNumber}
        />
      )}
    </Container>
  );
};

export default PlayerQuizSession;
