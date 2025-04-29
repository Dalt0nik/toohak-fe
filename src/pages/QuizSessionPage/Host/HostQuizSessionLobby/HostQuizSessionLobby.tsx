import { startQuizSession } from "@api/QuizSessionApi";
import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { QuizSessionStatus } from "@models/QuizSessionState";
import { QuizResponse } from "@models/Response/quizResponse";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { Stack, Typography, Grid, Box, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import QRCode from "react-qr-code";

const TRANSLATIONS_ROOT = "QuizSession.Host";
const START_GAME_SUCCESS_STATUS = 200;

interface HostQuizSessionLobbyProps {
  playerCount: number;
  sessionData: QuizSessionResponse;
  quizData: QuizResponse;
  onChangeSessionStatus: (newState: QuizSessionStatus) => void;
}

/**
 * Host quiz session component that is rendered when quiz status is ACTIVE.
 *
 * During status ACTIVE, host can view the number of players joined and can start the session
 */
const HostQuizSessionLobby = ({
  playerCount,
  sessionData,
  quizData,
  onChangeSessionStatus,
}: HostQuizSessionLobbyProps) => {
  const { mutate: startGameMutation, isPending: isGameStartPending } =
    useMutation({
      mutationFn: async () => {
        const response = await startQuizSession(sessionData.quizSessionId);
        if (response === START_GAME_SUCCESS_STATUS)
          onChangeSessionStatus(QuizSessionStatus.ACTIVE);
      },
    });

  const handleStartQuiz = () => {
    startGameMutation();
  };

  const joinUrl = `${window.location.origin}/join/${sessionData.joinId}`;

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h3" textAlign={"left"}>
          {t(`${TRANSLATIONS_ROOT}.QuizTitle`, { title: quizData.title })}
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
                {sessionData.joinId}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }} justifyContent={"space-between"}>
            <Stack spacing={2}>
              <Typography variant="h5">
                {t(`${TRANSLATIONS_ROOT}.PlayerCount`, { count: playerCount })}
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleStartQuiz}
                  color="success"
                >
                  {t(`${TRANSLATIONS_ROOT}.Start`)}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      {isGameStartPending && <LoadingBackdrop />}
    </>
  );
};

export default HostQuizSessionLobby;
