import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Cookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

const QuizSessionPage = () => {
  const location = useLocation();
  const quizSessionData: QuizSessionResponse = location.state;
  const cookies = new Cookies();
  const hasQuizSessionJwt = cookies.get("QuizSessionJwt");

  const handleStartQuiz = () => {
    console.log("Starting the quiz...");
  };

  const joinUrl = `${window.location.origin}/join/${quizSessionData.joinId}`;

  if (hasQuizSessionJwt) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
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
      </Box>
    );
  }

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
        Scan this QR to join the session
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
          {quizSessionData.joinId}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Joined Users
      </Typography>
      <List sx={{ marginBottom: "20px" }}>
        <ListItem key={0}>
          <ListItemText primary="SomeDude" />
        </ListItem>
        <ListItem key={1}>
          <ListItemText primary="SomeOtheDude" />
        </ListItem>
      </List>
      <Button variant="contained" onClick={handleStartQuiz}>
        Start Quiz
      </Button>
    </Box>
  );
};

export default QuizSessionPage;
