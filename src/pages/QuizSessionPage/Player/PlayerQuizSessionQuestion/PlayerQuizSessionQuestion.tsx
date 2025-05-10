import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import AnswerButton from "@components/quizSession/AnswerButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import QuestionDisplay from "@components/quizSession/QuestionDisplay";
import { useTranslation } from "react-i18next";
import { useAnswerQuestion } from "@hooks/useAnswerQuestion";
import { WsQuestion } from "@models/Response/ws/player/WsQuestion";
import CountdownTimer from "@components/CountdownTimer";

const PlayerQuizSessionQuestion = ({
  question,
  questionNumber,
  isRoundEnd = false,
  correctOptionId = "",
}: {
  question: WsQuestion;
  questionNumber: number;
  isRoundEnd?: boolean;
  correctOptionId?: string;
}) => {
  const { t } = useTranslation();

  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    setSelectedAnswer("");
  }, [question.id]);

  const { mutate: handleQuestionAnswerer } = useAnswerQuestion();

  const handleClick = (id: string) => {
    if (!selectedAnswer && !isRoundEnd) {
      setSelectedAnswer(id);
      handleQuestionAnswerer(id);
    }
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
        mt: isRoundEnd ? "5vh" : "10vh",
      }}
    >
      <Box sx={{ width: "100%", mb: 2 }}>
        <CountdownTimer key={question.id} duration={question.durationSeconds} />
      </Box>

      <QuestionDisplay
        questionTitle={question.title}
        questionNumber={questionNumber}
        questionImage={question.imageId != null ? question.imageId : ""}
        isMobile={isMobile}
      />

      {isRoundEnd ? (
        <Box sx={{ width: "100%", mt: 3 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 3,
              color: "success.main",
            }}
          >
            {t("QuizSession.correctAnswer")}
          </Typography>

          <Grid>
            {question.questionOptions.map((option, index) => {
              // Determine the button style based on correctness and selection
              const isCorrect = option.id === correctOptionId;
              const isSelected = option.id === selectedAnswer;
              const isIncorrectSelection = isSelected && !isCorrect;

              // Create appropriate sx prop
              const buttonSx = {
                backgroundColor: isCorrect
                  ? "success.light"
                  : isIncorrectSelection
                    ? "error.light"
                    : undefined,
                color:
                  isCorrect || isIncorrectSelection ? "white" : "text.primary",
                "&:hover": {
                  backgroundColor: isCorrect
                    ? "success.light"
                    : isIncorrectSelection
                      ? "error.light"
                      : undefined,
                  cursor: "default",
                },
              };

              return (
                <AnswerButton
                  onClick={() => {}}
                  ordering={index + 1}
                  disabled={false}
                  isMobile={isMobile}
                  key={option.id}
                  sx={buttonSx}
                >
                  {option.title}
                </AnswerButton>
              );
            })}
          </Grid>

          {selectedAnswer && selectedAnswer !== correctOptionId && (
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                color: "text.secondary",
              }}
            >
              {t("QuizSession.youSelected")}:{" "}
              {
                question.questionOptions.find((op) => op.id === selectedAnswer)
                  ?.title
              }
            </Typography>
          )}

          {selectedAnswer && selectedAnswer === correctOptionId && (
            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                color: "success.main",
                fontWeight: "bold",
              }}
            >
              {t("QuizSession.correctAnswerSelected")}!
            </Typography>
          )}
        </Box>
      ) : (
        <Grid>
          {selectedAnswer === "" ? (
            <>
              {question.questionOptions.map((option, index) => (
                <AnswerButton
                  onClick={() => handleClick(option.id)}
                  ordering={index + 1}
                  disabled={selectedAnswer === option.id}
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
      )}
    </Box>
  );
};

export default PlayerQuizSessionQuestion;
