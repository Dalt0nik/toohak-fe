import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { CARD_BACKGROUND_PURPLE } from "../../assets/styles/constants";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "@components/Loader";
import ImageCard from "@components/common/ui/ImageCard";
import OptionsList from "./OptionsList";
import { useQuiz } from "@hooks/useQuiz";
import { PrivateAppRoutes } from "@models/PrivateRoutes";

const QuizPage = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: quiz, isLoading, error } = useQuiz(id);

  const handleEditButton = () => {
    const path = generatePath(PrivateAppRoutes.EDIT_QUIZ_PAGE, { id: id! });
    navigate(path);
  };

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "left",
            ...theme.multiLineEllipsis(1),
          }}
        >
          {quiz?.title}
        </Typography>
        <Box sx={{ display: "flex", gap: theme.spacing(1) }}>
          <Button variant="contained" onClick={handleEditButton}>
            {t("QuizPage.editButton")}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Stack spacing={2}>
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
            <Typography
              component="span"
              variant="h5"
              sx={{ textAlign: "left" }}
            >
              {t("QuizPage.totalQuestions")} {quiz?.questions?.length}
            </Typography>
            <OptionsList questions={quiz!.questions} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stack sx={{ textAlign: "left" }} spacing={2}>
            <Typography variant="h3" gutterBottom>
              {t("QuizPage.gameSettings")}
            </Typography>
            <Typography variant="h4">{t("QuizPage.form")}</Typography>
            <Button variant="contained" color="success" fullWidth>
              {t("QuizPage.startButton")}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default QuizPage;
