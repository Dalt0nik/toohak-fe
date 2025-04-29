import { Box, Paper, Grid, Typography } from "@mui/material";
import ImageCard from "@components/common/ui/ImageCard";
import { useState } from "react";
import AnswerButton from "@components/quizSession/AnswerButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const QuestionPage = () => {
  // TEMP
  const quiz = {
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
            title: "Good",
            ordering: 1,
            isCorrect: true,
          },
          {
            id: "f31c87cf-d33f-4d16-b2ba-33b17c5ce142",
            questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
            title: "Okay",
            ordering: 2,
            isCorrect: false,
          },
          {
            id: "863544c5-83b1-4b76-88ee-11ee75395dd6",
            questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
            title: "Whatever",
            ordering: 3,
            isCorrect: false,
          },
          {
            id: "bec286e1-69a7-4383-965c-45f97dbcd322",
            questionId: "bf49c767-92f9-446b-8fe8-a8317135f60e",
            title: "Terrible",
            ordering: 4,
            isCorrect: false,
          },
        ],
      },
    ],
  };

  const [selectedAnswer, setSelectedAnswer] = useState("");

  // When time runs out on the question or everyone answers it can just get the state and then this can just set it
  const handleClick = (id: string, order: number) => {
    console.log(id);
    setSelectedAnswer(id);
    console.log(order);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const question = quiz["questions"][0]; //TEMP

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
      {!isMobile ? (
        <>
          <Paper
            sx={{
              bgcolor: "text.secondary",
              marginBottom: "10px",
              p: "10px",
            }}
          >
            <Typography
              variant="h3"
              color="#000000"
              sx={{
                marginBottom: "10xpx",
                wordBreak: "break-word",
                fontSize: 35,
              }}
            >
              {question["title"]}
            </Typography>
          </Paper>
          <ImageCard id={question["imageId"]} />
        </>
      ) : (
        <></>
      )}

      {/* Not entirely sure how to use foreach while keeping grid intact, maybe use different container? */}
      <Grid>
        <Grid>
          <AnswerButton
            ordering={1}
            onClick={() => handleClick(question["questionOptions"][0]["id"], 1)}
            disabled={selectedAnswer == question["questionOptions"][0]["id"]}
          >
            {!isMobile ? question["questionOptions"][0]["title"] : ""}
          </AnswerButton>
          <AnswerButton
            ordering={2}
            onClick={() => handleClick(question["questionOptions"][1]["id"], 2)}
            disabled={selectedAnswer == question["questionOptions"][1]["id"]}
          >
            {!isMobile ? question["questionOptions"][1]["title"] : ""}
          </AnswerButton>
        </Grid>
        <Grid>
          <AnswerButton
            ordering={3}
            onClick={() => handleClick(question["questionOptions"][2]["id"], 3)}
            disabled={selectedAnswer == question["questionOptions"][2]["id"]}
          >
            {!isMobile ? question["questionOptions"][2]["title"] : ""}
          </AnswerButton>
          <AnswerButton
            ordering={4}
            onClick={() => handleClick(question["questionOptions"][3]["id"], 4)}
            disabled={selectedAnswer == question["questionOptions"][3]["id"]}
          >
            {!isMobile ? question["questionOptions"][3]["title"] : ""}
          </AnswerButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionPage;
