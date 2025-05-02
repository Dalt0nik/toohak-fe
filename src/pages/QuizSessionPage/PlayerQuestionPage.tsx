import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import AnswerButton from "@components/quizSession/AnswerButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import QuestionDisplay from "@components/quizSession/QuestionDisplay";
import { useTranslation } from "react-i18next";

const QuestionPage = () => {
  const { t } = useTranslation();

  // TEMP
  const mockQuiz = {
    id: "6af3fbac-7086-45ab-8b9d-1ad68508d92a",
    title: "Wellness Quiz",
    createdBy: "1eb4cf8d-d7b5-4e01-ba1d-8aa2bffdccf3",
    imageId: null,
    description: "It checks whether you are okay in the head",
    createdAt: "2025-04-15T11:46:05.960423Z",
    updatedAt: "2025-04-15T11:46:05.960423Z",
    questions: [
      {
        id: "bf49c767-92f9-446b-8fe8-a8317135f60e",
        quizId: "6af3fbac-7086-45ab-8b9d-1ad68508d92a",
        imageId: null,
        title: "How are you doing?",
        questionOptions: [
          {
            id: "c65b862e-c72a-4d47-a103-b74313e83a9f",
            questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
            title: "1234567890",
            ordering: 1,
            isCorrect: true,
          },
          {
            id: "f31c87cf-d33f-4d16-b2ba-33b17c5ce142",
            questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
            title: "12345678901234567890123456789012345678901234567890",
            ordering: 2,
            isCorrect: false,
          },
          {
            id: "863544c5-83b1-4b76-88ee-11ee75395dd6",
            questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
            title:
              "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
            ordering: 3,
            isCorrect: false,
          },
          {
            id: "bec286e1-69a7-4383-965c-45f97dbcd322",
            questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
            title:
              "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
            ordering: 4,
            isCorrect: false,
          },
        ],
      },
    ],
  };

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleClick = (id: string) => {
    if (selectedAnswer != "") return console.log("Already Selected");
    setSelectedAnswer(id);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const question = mockQuiz["questions"][0]; //TEMP
  const options = mockQuiz["questions"][0]["questionOptions"]; //TEMP

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
        questionTitle={question["title"]}
        questionNumber={1}
        questionImage={question["imageId"] != null ? question["imageId"] : ""}
        isMobile={isMobile}
      />
      <Grid>
        {selectedAnswer == "" ? (
          <>
            {options.map((option, index) => (
              <AnswerButton
                onClick={() => handleClick(option["id"])}
                ordering={index + 1}
                disabled={selectedAnswer == option["id"]}
                isMobile={isMobile}
                key={option["id"]}
              >
                {option["title"]}
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

export default QuestionPage;
