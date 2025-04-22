import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { findQuizSession } from "@api/QuizSessionApi";
import { PublicAppRoutes } from "@models/PublicRoutes";
import { useAuth0 } from "@auth0/auth0-react";
import PlayerQuizSession from "./PlayerQuizSession";
import HostQuizSession from "./HostQuizSession";
import { usePlayerJwt } from "@hooks/usePlayerJwt";

const QuizSessionPage = () => {
  const { joinId } = useParams<{ joinId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const playerJwt = usePlayerJwt();

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session", joinId],
    queryFn: () => findQuizSession(joinId!),
    enabled: !!joinId,
  });

  const handleStartQuiz = () => {
    console.log("Starting the quiz...");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>{t("loading")}</Typography>
      </Box>
    );
  }

  if (error instanceof Error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          {t("QuizSession.JoinCodeInvalid")}
        </Typography>
        <Typography sx={{ marginBottom: "20px" }}>{error.message}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate(PublicAppRoutes.JOIN_SESSION)}
        >
          {t("QuizSession.TryDifferentCode")}
        </Button>
      </Box>
    );
  }

  const auth0Id = user?.sub;
  const isSessionOwner = session?.createdBy === auth0Id;
  const isValidSessionJwt = session?.quizSessionId === playerJwt?.quizSessionId;
  const joinUrl = `${window.location.origin}/join/${session?.joinId}`;

  if (isValidSessionJwt) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* Temporary UI */}
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Joined Users
        </Typography>
        <List>
          <ListItem key={0}>
            <ListItemText primary="SomeDude" />
          </ListItem>
          <ListItem key={1}>
            <ListItemText primary="SomeOtheDude" />
          </ListItem>
        </List>
        <PlayerQuizSession playerJwt={playerJwt!} />
      </Box>
    );
  }

  if (isSessionOwner) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          {t("QuizSession.ScanQRCode")}
        </Typography>
        <Box
          sx={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "8px",
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
          <Typography variant="h6">Join Code</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {joinId}
          </Typography>
        </Box>

        {/* Temporary UI */}
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Joined Users
        </Typography>
        <HostQuizSession sessionId={session!.quizSessionId} />
        {/* <List sx={{ marginBottom: "20px" }}>
          <ListItem key={0}>
            <ListItemText primary="SomeDude" />
          </ListItem>
          <ListItem key={1}>
            <ListItemText primary="SomeOtheDude" />
          </ListItem>
        </List> */}

        <Button variant="contained" onClick={handleStartQuiz}>
          {t("QuizSession.Start")}
        </Button>
      </Box>
    );
  }
};

export default QuizSessionPage;
