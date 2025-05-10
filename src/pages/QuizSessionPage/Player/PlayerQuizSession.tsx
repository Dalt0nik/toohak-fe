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
import { WsEventRoundEnd } from "@models/Response/ws/all/WsEventRoundEnd.ts";
import { WsQuestionOption } from "@models/Response/ws/player/WsQuestion.ts";
import { WsPlayer } from "@models/Response/ws/all/WsPlayer.ts";
import ScoreBackdrop from "@components/quizSession/ScoreBackdrop";

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

  const [isRoundEnded, setIsRoundEnded] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<WsQuestionOption | null>(
    null,
  );
  const [roundEndPlayers, setRoundEndPlayers] = useState<WsPlayer[]>([]);
  const [showScoreBackdrop, setShowScoreBackdrop] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [userPosition, setUserPosition] = useState(0);

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
        setIsRoundEnded(false);
        setCorrectAnswer(null);
        setCurrentQuestion(evt.question);
        setQuestionNumber((prev) => prev + 1);
      },
      onRoundEnd: (evt: WsEventRoundEnd) => {
        setIsRoundEnded(true);
        setCorrectAnswer(evt.roundEnd.correctOption);
        setRoundEndPlayers(evt.roundEnd.players);

        if (playerJwt) {
          const currentPlayer = roundEndPlayers.find(
            (player) => player.nickname === playerJwt.nickname,
          );
          if (currentPlayer) {
            setUserScore(currentPlayer.score);

            const sortedPlayers = roundEndPlayers.sort(
              (a, b) => b.score - a.score,
            );
            const position =
              sortedPlayers.findIndex(
                (player) => player.nickname === playerJwt.nickname,
              ) + 1;
            setUserPosition(position);

            setShowScoreBackdrop(true);

            setTimeout(() => {
              setShowScoreBackdrop(false);
            }, 3000);
          }
        }
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
      {!currentQuestion && !isRoundEnded && (
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

      {currentQuestion && !isRoundEnded && (
        <PlayerQuizSessionQuestion
          question={currentQuestion}
          questionNumber={questionNumber}
        />
      )}

      {isRoundEnded && correctAnswer && currentQuestion && (
        <PlayerQuizSessionQuestion
          question={currentQuestion}
          questionNumber={questionNumber}
          isRoundEnd={isRoundEnded}
          correctOptionId={correctAnswer.id}
        />
      )}
      {showScoreBackdrop && (
        <ScoreBackdrop score={userScore} position={userPosition} />
      )}
    </Container>
  );
};

export default PlayerQuizSession;
