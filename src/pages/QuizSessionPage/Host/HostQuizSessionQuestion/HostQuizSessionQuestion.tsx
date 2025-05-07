import { Box, Grid } from "@mui/material";
import AnswerButton from "@components/quizSession/AnswerButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import QuestionDisplay from "@components/quizSession/QuestionDisplay";
import { QuestionResponse } from "@models/Response/questionResponse";

const HostQuizSessionQuestion = ({
  question,
  questionNumber,
}: {
  question: QuestionResponse;
  questionNumber: number;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Maybe instead of this display some kind of error if isMobile = true?

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
        {question.questionOptions.map((option, index) => (
          <AnswerButton
            ordering={index + 1}
            disabled
            hostView
            isMobile={isMobile}
            key={option.id}
          >
            {option.title}
          </AnswerButton>
        ))}
      </Grid>
    </Box>
  );
};

export default HostQuizSessionQuestion;
