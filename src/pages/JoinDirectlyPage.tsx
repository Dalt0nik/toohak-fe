import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { findQuizSession, joinQuizSession } from "@api/QuizSessionApi";
import { PublicAppRoutes } from "@models/PublicRoutes";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import WhiteTextField from "@components/common/ui/WhiteTextField";
import { useState } from "react";
import { JoinQuizSessionRequest } from "@models/Request/JoinQuizSessionRequest";
import { JwtResponse } from "@models/Response/JwtResponse";
import { Cookies } from "react-cookie";

const JoinDirectlyPage = () => {
  const { "join-id": joinId } = useParams<{ "join-id": string }>();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session", joinId],
    queryFn: () => findQuizSession(joinId!),
    enabled: !!joinId,
  });

  const cookies = new Cookies();

  const joinQuizSessionMutation = useMutation({
    mutationFn: (req: JoinQuizSessionRequest) => joinQuizSession(req),
    onSuccess: (res: JwtResponse) => {
      cookies.set("QuizSessionJwt", res.accessToken);
      navigate(PrivateAppRoutes.QUIZ_SESSION_PAGE, { state: session });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleOnClick = () => {
    if (session?.quizSessionId != undefined) {
      const req: JoinQuizSessionRequest = {
        quizSessionId: session?.quizSessionId,
        nickname: nickname,
      };
      joinQuizSessionMutation.mutate(req);
    }
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
        <Typography>Loading session...</Typography>
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
          The code is incorrect.
        </Typography>
        <Typography sx={{ marginBottom: "20px" }}>{error.message}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate(PublicAppRoutes.JOIN_SESSION)}
        >
          Try a different code
        </Button>
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
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Enter nickname
      </Typography>
      <WhiteTextField
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
        variant="outlined"
        sx={{ marginBottom: "20px", width: "300px" }}
      />
      <Button variant="contained" onClick={handleOnClick}>
        Enter
      </Button>
    </Box>
  );
};

export default JoinDirectlyPage;
