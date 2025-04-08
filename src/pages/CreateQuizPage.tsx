import React from "react";
import { useCreateQuiz } from "@hooks/useCreateQuiz";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { QuizForm } from "@components/quiz/QuizCreation/QuizForm";

const CreateQuizPage: React.FC = () => {
  const createQuizMutation = useCreateQuiz();

  const handleCreateQuiz = (data: NewQuizRequest) => {
    createQuizMutation.mutate(data);
  };

  return (
    <div>
      <QuizForm
        onSubmit={handleCreateQuiz}
        isSubmitting={createQuizMutation.isPending}
      />
    </div>
  );
};

export default CreateQuizPage;
