import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import useFetchQuizById from "@hooks/api/useFetchQuizById";
import useHostWebSocket from "@hooks/ws/useHostWebScoket";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

interface HostQuizSessionProps {
  joinId: string;
}

const TRANSLATIONS_ROOT = "QuizSession.Host";

/**
 * Main component responsible for connecting host quiz session UI and websocket connection
 */
const HostQuizSession = ({ joinId }: HostQuizSessionProps) => {
  const { initializeHostWebSocketClient, isConnected } = useHostWebSocket({
    onHostDisconnectedEvent: () => {},
    onPlayerDisconnectedEvent: () => {
      setPlayerCount((prev) => prev - 1);
    },
    onPlayerJoinedEvent: () => {
      setPlayerCount((prev) => prev + 1);
    },
  });

  const queryClient = useQueryClient();

  const session = queryClient.getQueryData([
    "session",
    joinId,
  ]) as QuizSessionResponse;
  const { data: quiz, isLoading: isQuizLoading } = useFetchQuizById(
    session.quizId,
  );

  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    initializeHostWebSocketClient(session.quizSessionId);
  }, [session.quizSessionId]);

  const joinUrl = `${window.location.origin}/join/${session?.joinId}`;

  const handleStartQuiz = () => {
    //TODO: implement
  };

  if (isQuizLoading && !isConnected) {
    return <LoadingBackdrop />;
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h3" textAlign={"left"}>
          {quiz!.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              {t(`${TRANSLATIONS_ROOT}.ScanQRCode`)}
            </Typography>
            <Box
              sx={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "8px",
                width: "fit-content",
                marginInline: "auto",
              }}
            >
              <QRCode value={joinUrl} />
            </Box>
            <Box
              sx={{
                padding: "20px",
                marginBottom: "20px",
                textAlign: "center",
                boxShadow: 1,
                borderRadius: 1,
              }}
            >
              <Typography variant="h6">
                {t(`${TRANSLATIONS_ROOT}.JoinCodeTitle`)}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {joinId}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }} justifyContent={"space-between"}>
            <Typography variant="h5">
              {t(`${TRANSLATIONS_ROOT}.PlayerCount`, { count: playerCount })}
            </Typography>
            <Button
              variant="contained"
              onClick={handleStartQuiz}
              color="success"
            >
              {t(`${TRANSLATIONS_ROOT}.Start`)}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default HostQuizSession;
