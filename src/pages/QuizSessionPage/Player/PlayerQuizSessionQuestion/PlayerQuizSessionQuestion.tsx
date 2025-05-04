import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import AnswerButton from "@components/quizSession/AnswerButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import QuestionDisplay from "@components/quizSession/QuestionDisplay";
import { useTranslation } from "react-i18next";
import { QuestionResponse } from "@models/Response/questionResponse";

const PlayerQuizSessionQuestion = ({
  question,
  questionNumber,
}: {
  question: QuestionResponse;
  questionNumber: number;
}) => {
  const { t } = useTranslation();

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleClick = (id: string) => {
    if (selectedAnswer != "") return console.log("Already Selected");
    setSelectedAnswer(id);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "center",
        mt: "10vh",
      }}
    >
      <QuestionDisplay
        questionTitle={question.title}
        questionNumber={questionNumber}
        questionImage={question.imageId != null ? question.imageId : ""}
        isMobile={isMobile}
      />
      <Grid>
        {selectedAnswer == "" ? (
          <>
            {question.questionOptions.map((option, index) => (
              <AnswerButton
                onClick={() => handleClick(option.id)}
                ordering={index + 1}
                disabled={selectedAnswer == option.id}
                isMobile={isMobile}
                key={option.id}
              >
                {option.title}
              </AnswerButton>
            ))}
          </>
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
