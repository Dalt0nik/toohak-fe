import { useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { CARD_BACKGROUND_PURPLE } from "../../assets/styles/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuizById, deleteQuizById } from "@api/QuizApi";
import { useTranslation } from "react-i18next";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import DeleteConfirmationDialog from "@components/DeleteConfirmationDialog";
import { QuizResponse } from "@models/Response/quizResponse";
import Loader from "@components/Loader";
import ImageCard from "@components/common/ui/ImageCard";
import OptionsList from "./OptionsList";

const QuizPage = () => {
  const theme = useTheme();
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

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 3,
            textAlign: "left",
          }}
        >
          {quiz?.title}
        </Typography>
        <Box sx={{ display: "flex", gap: theme.spacing(1) }}>
          <Button variant="contained">{t("QuizPage.editButton")}</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteDialogOpen}
          >
            {t("QuizPage.deleteButton")}
          </Button>
          <Button variant="contained" color="success">
            {t("QuizPage.startButton")}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 12, sm: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2),
          }}
        >
          <Box
            sx={{
              backgroundColor: CARD_BACKGROUND_PURPLE,
              borderRadius: theme.borderRadius?.md,
            }}
          >
            <ImageCard alt="Quiz cover" id={quiz!.imageId} />
          </Box>
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            {t("QuizPage.descriptionTitle")}
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {quiz?.description}
          </Typography>
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            {t("QuizPage.questionsTitle")}
          </Typography>
          <Typography component="span" variant="h5" sx={{ textAlign: "left" }}>
            {t("QuizPage.totalQuestions")} {quiz?.questions?.length}
          </Typography>
          <OptionsList questions={quiz!.questions} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h3" gutterBottom>
              {t("QuizPage.gameSettings")}
            </Typography>
            <Typography variant="h4">{t("QuizPage.form")}</Typography>
          </Box>
        </Grid>
      </Grid>
      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleDeleteDialogClose}
        onDelete={() => quiz && handleDelete.mutate(quiz.id)}
      />
    </>
  );
};

export default QuizPage;
