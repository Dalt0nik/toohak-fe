import React from "react";
import { Typography, Grid2 as Grid } from "@mui/material";
import QuizForm from "@components/QuizForm";
import { useCreateQuiz } from "@hooks/useCreateQuiz";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";

const CreateQuizPage: React.FC = () => {
  const createQuizMutation = useCreateQuiz();

  const handleCreateQuiz = (data: NewQuizRequest) => {
    createQuizMutation.mutate(data);
  };

  return (
    <>
      <Typography variant="h2" component="h2" align="left" sx={{ mb: 3 }}>
        Create new quiz
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" component="h6">
            Quiz Details
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <QuizForm
            onSubmit={handleCreateQuiz}
            isSubmitting={createQuizMutation.isPending}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateQuizPage;
