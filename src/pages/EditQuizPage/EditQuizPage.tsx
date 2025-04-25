import React from "react";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuiz } from "@hooks/useQuiz";
import Loader from "@components/Loader";
import { useUpdateQuiz } from "@hooks/useUpdateQuiz";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useDeleteQuiz } from "@hooks/useDeleteQuiz";
import EditQuizForm from "./EditQuizForm";

const EditQuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: quiz, isLoading, error } = useQuiz(id);
  const { mutate: updateQuiz } = useUpdateQuiz();
  const { mutate: deleteQuiz } = useDeleteQuiz();

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <p>{error.message}</p>;

  const handleEditQuiz = (data: NewQuizRequest) => {
    if (!id) return;
    updateQuiz({ id, data });
  };

  const handleDelete = (id: string) => {
    // if (!id) return;
    console.log(quiz);
    deleteQuiz(id);
  };

  return (
    <>
      <Typography variant="h2" component="h2" align="left" sx={{ mb: 3 }}>
        Edit Quiz
        <Button
          color="error"
          variant="contained"
          onClick={() => handleDelete(id!)}
        >
          delete
        </Button>
      </Typography>
      <EditQuizForm initialData={quiz!} onSubmit={handleEditQuiz} />
    </>
  );
};

export default EditQuizPage;
