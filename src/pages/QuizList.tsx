import { QuizDTO } from "../types/quizDTO";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import QuizCard from "../components/QuizCard";
import { fetchQuizList } from "../api/quizListAPI";
import { Typography } from "@mui/material";

const QuizList = () => {
  const { t } = useTranslation();
  const [quizzes, setQuizzes] = useState<QuizDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetchQuizList();
        setQuizzes(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        sx={{ mb: 3, textAlign: "left", fontWeight: 700 }}
      >
        {t("yourQuizzes")}
      </Typography>
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={3} key={quiz.id}>
            <QuizCard quiz={quiz} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default QuizList;
