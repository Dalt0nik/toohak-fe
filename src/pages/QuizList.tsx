import { QuizCardDTO } from "../types/quizCardDTO";
import { Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import QuizCard from "../components/QuizCard";
import { fetchQuizList } from "../api/quizListApi";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const QuizList = () => {
  const { t } = useTranslation();

  const {
    data: quizzes,
    isLoading,
    isError,
  } = useQuery<QuizCardDTO[]>({
    queryKey: ["quizList"],
    queryFn: fetchQuizList,
  });

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  if (isError) {
    return <div>{t("user_quiz_list_error")}</div>;
  }

  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        sx={{ mb: 3, textAlign: "left", fontWeight: 700 }}
      >
        {t("user_quiz_list_yourQuizzes")}
      </Typography>

      {quizzes && quizzes.length > 0 ? (
        <Grid container spacing={3}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={3} key={quiz.id}>
              <QuizCard quiz={quiz} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h3" component="h3">
            {t("user_quiz_list_noQuizzes")}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default QuizList;
