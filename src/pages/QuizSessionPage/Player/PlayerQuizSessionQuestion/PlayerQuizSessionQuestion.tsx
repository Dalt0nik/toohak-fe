import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import AnswerButton from "@components/quizSession/AnswerButton";
import QuestionDisplay from "@components/quizSession/QuestionDisplay";
import { useTranslation } from "react-i18next";
import { useAnswerQuestion } from "@hooks/useAnswerQuestion";
import { WsQuestion } from "@models/Response/ws/player/WsQuestion";
import CountdownTimer from "@components/CountdownTimer";
import AnswersContainer from "@pages/QuizSessionPage/AnswersContainer";

const PlayerQuizSessionQuestion = ({
  question,
  questionNumber,
}: {
  question: WsQuestion;
  questionNumber: number;
}) => {
  const { t } = useTranslation();

  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    setSelectedAnswer("");
  }, [question.id]);

  const { mutate: handleQuestionAnswerer } = useAnswerQuestion();

  const handleClick = (id: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(id);
      handleQuestionAnswerer(id);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", mb: 2 }}>
        {!selectedAnswer && (
          <CountdownTimer
            key={question.id}
            duration={question.durationSeconds}
          />
        )}
      </Box>

      <QuestionDisplay
        questionTitle={question.title}
        questionNumber={questionNumber}
        questionImage={question.imageId != null ? question.imageId : ""}
      />
      <Grid>
        {selectedAnswer === "" ? (
          <AnswersContainer>
            {question.questionOptions.map((option, index) => (
              <AnswerButton
                onClick={() => handleClick(option.id)}
                ordering={index + 1}
                disabled={selectedAnswer === option.id}
                key={option.id}
              >
                {option.title}
              </AnswerButton>
            ))}
          </AnswersContainer>
        ) : (
          <>
            <Typography
              sx={{
                mt: 5,
                mb: { xs: "30vw", md: 0 },
              }}
              variant="h3"
            >
              {t("QuizSession.answerSelected")}
            </Typography>
            <Typography variant="h4" sx={{ mb: 5 }}>
              {t("QuizSession.waitingForOthers")}
            </Typography>
            <CircularProgress
              sx={{
                color: "text.secondary",
              }}
              size="25%"
            />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default PlayerQuizSessionQuestion;
