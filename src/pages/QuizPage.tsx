import { useState } from "react";
import theme from "@assets/styles/theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { CARD_BACKGROUND_PURPLE } from "../assets/styles/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuizById, deleteQuizById, fetchImageById } from "@api/QuizApi";

import { QuestionResponse } from "@models/Response/questionResponse";
import { useTranslation } from "react-i18next";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import DeleteConfirmationDialog from "@components/DeleteConfirmationDialog";
import { QuizResponse } from "@models/Response/quizResponse";
import Loader from "@components/Loader";
import { createQuizSession } from "@api/QuizSessionApi";
import { NewQuizSessionResponse } from "@models/Response/NewQuizSessionResponse";
import { NewQuizSessionRequest } from "@models/Request/NewQuizSessionRequest";

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery<QuizResponse>({
    queryKey: ["quiz", id],
    queryFn: () => fetchQuizById(id!),
    enabled: !!id,
  });

  const {
    data: coverImage,
    isLoading: imageLoading,
    error: imageError,
  } = useQuery<string>({
    queryKey: ["coverImage", quiz?.imageId],
    queryFn: () => fetchImageById(quiz!.imageId),
    enabled: Boolean(quiz?.imageId),
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = useMutation({
    mutationFn: (id: string) => deleteQuizById(id),
    onSuccess: () => {
      navigate(PrivateAppRoutes.USER_QUIZZES);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const createQuizSessionMutation = useMutation({
    mutationFn: (req: NewQuizSessionRequest) => createQuizSession(req),
    onSuccess: (res: NewQuizSessionResponse) => {
      navigate(
        PrivateAppRoutes.QUIZ_SESSION_PAGE.replace(
          ":session-id",
          res.quizSessionId,
        ),
        { state: res },
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleStartClick = (id: string | undefined) => {
    if (id != undefined) {
      const requestData: NewQuizSessionRequest = {
        quizId: id,
      };
      createQuizSessionMutation.mutate(requestData);
    }
  };

  if (isLoading || imageLoading) return <Loader />;
  if (error instanceof Error) return <p>{error.message}</p>;
  if (imageError instanceof Error)
    return (
      <p>
        {t("Error loading cover image")}: {imageError.message}
      </p>
    );

  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h3"
        sx={{
          mb: 3,
          textAlign: "left",
        }}
      >
        {quiz?.title}
        <Button variant="contained" sx={{ ml: 2 }}>
          {t("QuizPage.editButton")}
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ ml: 2 }}
          onClick={handleDeleteDialogOpen}
        >
          {t("QuizPage.deleteButton")}
        </Button>
      </Typography>
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 12, sm: 8 }}
          sx={{ backgroundColor: CARD_BACKGROUND_PURPLE }}
        >
          {coverImage ? (
            <CardMedia component="img" image={coverImage} alt="Quiz Cover" />
          ) : (
            <ImageNotSupportedOutlinedIcon
              sx={{
                fontSize: { xs: 100, sm: 150, md: 200, lg: 250 },
                color: "black",
              }}
            />
          )}
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {quiz?.description}
          </Typography>
          <Accordion
            sx={{
              backgroundColor: CARD_BACKGROUND_PURPLE,
              border: "1px solid",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                {t("QuizPage.totalQuestions")} {quiz?.questions?.length}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {quiz?.questions && quiz.questions.length > 0 ? (
                <List>
                  {quiz.questions.map((q: QuestionResponse) => (
                    <ListItem key={q.id} sx={{ paddingY: 0 }}>
                      <ListItemText primary={q.title} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="red">{t("QuizPage.noQuestions")}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {t("QuizPage.gameSettings")}
            </Typography>
            <Typography>{t("QuizPage.form")}</Typography>
            <Button
              variant="contained"
              onClick={() => handleStartClick(quiz?.id)}
            >
              {t("QuizPage.startButton")}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleDeleteDialogClose}
        onDelete={() => quiz && handleDelete.mutate(quiz.id)}
      />
    </ThemeProvider>
  );
};

export default QuizPage;
