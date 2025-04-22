import React from "react";
import { QuizForm } from "@components/quiz/QuizCreation/QuizForm";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuiz } from "@hooks/useQuiz";
import Loader from "@components/Loader";
import { useUpdateQuiz } from "@hooks/context/useUpdateQuiz";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";

const EditQuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: quiz, isLoading, error } = useQuiz(id);
  const { mutate: updateQuiz } = useUpdateQuiz();

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <p>{error.message}</p>;

  const handleEditQuiz = (data: NewQuizRequest) => {
    if (!id) return;
    updateQuiz({ id, data });
  };

  // export const QuizForm: React.FC<QuizFormProps> = ({
  //   onSubmit,
  //   isSubmitting,
  //   autoSubmitQuestion = false,
  //   autoDeleteQuestion = false,
  //   initialData,

  return (
    <>
      <Typography variant="h2" component="h2" align="left" sx={{ mb: 3 }}>
        Edit Quiz
      </Typography>
      <QuizForm
        onSubmit={handleEditQuiz}
        isSubmitting={false}
        autoSubmitQuestion={true}
        autoDeleteQuestion={true}
        initialData={quiz}
      />
    </>
  );
};

export default EditQuizPage;
