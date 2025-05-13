import { WsQuestion } from "@models/Response/ws/player/WsQuestion.ts";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Grid, Typography } from "@mui/material";
import QuestionDisplay from "@components/quizSession/QuestionDisplay.tsx";
import AnswerButton from "@components/quizSession/AnswerButton.tsx";

const PlayerQuizSessionAnswered = ({
  question,
  questionNumber,
  correctAnswer,
}: {
  question: WsQuestion;
  questionNumber: number;
  correctAnswer: string | null;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: 3,
      }}
    >
      <QuestionDisplay
        questionTitle={question.title}
        questionNumber={questionNumber}
        questionImage={question.imageId != null ? question.imageId : ""}
        isMobile={isMobile}
      />

      <Grid>
        {question.questionOptions.map((option, index) => {
          const isCorrect = option.id === correctAnswer;

          return (
            <AnswerButton
              ordering={index + 1}
              isMobile={isMobile}
              disabled={true}
              hostView={true}
              correct={isCorrect}
            >
              {option.title}
            </AnswerButton>
          );
        })}
      </Grid>
      <Typography variant="body1" sx={{ mt: 3 }}>
        {t("QuizSession.waitingForNextQuestion")}
      </Typography>
    </Box>
  );
};

export default PlayerQuizSessionAnswered;
