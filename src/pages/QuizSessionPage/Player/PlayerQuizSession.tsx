import { usePlayerJwt } from "@hooks/usePlayerJwt";
import usePlayerWebSocket from "@hooks/ws/usePlayerWebSocket";
import {
  Box,
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

const mockQuestion = {
  id: "bf49c767-92f9-446b-8fe8-a8317135f60e",
  quizId: "6af3fbac-7086-45ab-8b9d-1ad68508d92a",
  imageId: "",
  title: "How are you doing?",
  questionOptions: [
    {
      id: "c65b862e-c72a-4d47-a103-b74313e83a9f",
      questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
      title: "1234567890",
      ordering: 1,
      isCorrect: true,
    },
    {
      id: "f31c87cf-d33f-4d16-b2ba-33b17c5ce142",
      questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
      title: "12345678901234567890123456789012345678901234567890",
      ordering: 2,
      isCorrect: false,
    },
    {
      id: "863544c5-83b1-4b76-88ee-11ee75395dd6",
      questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
      title:
        "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
      ordering: 3,
      isCorrect: false,
    },
    {
      id: "bec286e1-69a7-4383-965c-45f97dbcd322",
      questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
      title:
        "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
      ordering: 4,
      isCorrect: false,
    },
  ],
};

/**
 * Main component responsible for connecting player quiz session UI and websocket connection
 */
const PlayerQuizSession = () => {
  const playerJwt = usePlayerJwt();
  const [players, setPlayers] = useState<string[]>([]);
  const { init, isConnected, deactivateConnection } = usePlayerWebSocket({
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

      <Box mt={4}>
        <PlayerQuizSessionQuestion question={mockQuestion} questionNumber={1} />
      </Box>
    </Container>
  );
};

export default PlayerQuizSession;
