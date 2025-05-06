import { usePlayerJwt } from "@hooks/usePlayerJwt";
import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import PlayerQuizSessionQuestion from "@pages/QuizSessionPage/Player/PlayerQuizSessionQuestion/PlayerQuizSessionQuestion";
import { WsEventPlayerJoined } from "@models/Response/ws/all/WsEventPlayerJoined";
import { WsEventPlayerDisconnected } from "@models/Response/ws/all/WsEventPlayerDisconnected";
import { useQuery } from "@tanstack/react-query";
import { fetchConnectedUsers } from "@api/QuizSessionApi";
import { WsEventPlayerNewQuestion } from "@models/Response/ws/player/WsEventPlayerNewQuestion";
import { WsQuestion } from "@models/Response/ws/player/WsQuestionOption";

/**
 * Main component responsible for connecting player quiz session UI and websocket connection
 */
const PlayerQuizSession = () => {
  const playerJwt = usePlayerJwt();
  const [players, setPlayers] = useState<string[]>([]);
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
  const [currentQuestion, setCurrentQuestion] = useState<WsQuestion | null>(
    null,
  );
  const [questionNumber, setQuestionNumber] = useState(0);

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

  const handleDeactivateConnection = () => {
    deactivateConnection();
    setPlayers([]);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card
        elevation={3}
        sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Joined Players
          </Typography>

          <List>
            {players.length > 0 ? (
              players.map((nickname) => (
                <ListItem
                  key={nickname}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <ListItemText primary={nickname} />
                </ListItem>
              ))
            ) : (
              <Typography color="text.secondary">
                No one has joined yet
              </Typography>
            )}
          </List>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          {isConnected ? (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeactivateConnection}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => init(playerJwt!.quizSessionId)}
            >
              Reconnect
            </Button>
          )}
        </CardActions>
      </Card>

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
