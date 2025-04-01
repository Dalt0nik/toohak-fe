import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Grid2 as Grid } from "@mui/material";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import { useCallback, useState } from "react";

import { Quiz } from "@models/QuizModel";
import { createNewQuiz } from "@api/QuizApi";
import { useMutation } from "@tanstack/react-query";

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState<Quiz>({
    createdBy: "d8621080-a2d0-4011-a0d3-e6ae5d7a4f72",
    title: "",
    description: "",
  });

  const handleChangeValue = useCallback(
    (key: keyof Pick<Quiz, "title" | "description">, value: string) => {
      setQuizData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    },
    [],
  );

  const createQuizMutation = useMutation({
    mutationFn: createNewQuiz,
    onSuccess: (response: number) => {
      if (response === 201) {
        console.log("Quiz created successfully :D");
      }
    },
    onError: (error: Error) => {
      console.error("Error creating quiz: ", error.message);
    },
  });

  const handleCreateNewQuiz = useCallback(() => {
    createQuizMutation.mutate(quizData);
  }, [createQuizMutation, quizData]);

  return (
    <>
      <Typography variant="h2" component="h2" align="left">
        Create new quiz
      </Typography>
      <Grid
        container
        columns={10}
        direction="row"
        alignItems="flex-start"
        sx={{ mb: 5 }}
      >
        <Grid size={{ xs: 4 }}>
          <Typography variant="h4" component="h4">
            Quiz Details
          </Typography>
        </Grid>

        <Grid size={{ xs: 6 }} sx={{ textAlign: "left" }}>
          <Stack spacing={2}>
            <Typography variant="h6" component="h6">
              Title
            </Typography>
            <TextField
              required
              value={quizData.title}
              id="quiz-title"
              variant="outlined"
              helperText={quizData.title.length + "/200"}
              slotProps={{ htmlInput: { maxLength: 200 } }}
              onChange={(e) => handleChangeValue("title", e.target.value)}
            />
            <Typography variant="h6" component="h6">
              Description
            </Typography>
            <TextField
              value={quizData.description}
              id="quiz-description"
              variant="outlined"
              helperText={quizData.description.length + "/500"}
              slotProps={{ htmlInput: { maxLength: 500 } }}
              onChange={(e) => handleChangeValue("description", e.target.value)}
            />
          </Stack>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        disabled={!quizData.title || createQuizMutation.isPending}
        onClick={handleCreateNewQuiz}
        sx={{ mt: 3 }}
      >
        {createQuizMutation.isPending ? "Saving..." : "Save"}
      </Button>
    </>
  );
};

export default CreateQuiz;
