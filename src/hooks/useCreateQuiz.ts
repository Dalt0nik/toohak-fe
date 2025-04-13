import { useMutation } from "@tanstack/react-query";
import { createNewQuiz } from "@api/QuizApi";
import { NewQuizResponse } from "@models/Response/NewQuizResponse";
import { useNavigate } from "react-router-dom";
import { PrivateAppRoutes } from "@models/PrivateRoutes";

export const useCreateQuiz = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createNewQuiz,
    onSuccess: (response: NewQuizResponse) => {
      navigate(PrivateAppRoutes.QUIZ_PAGE.replace(":id", response.id));
    },
    onError: (error: Error) => {
      console.error("Error creating quiz:", error.message);
    },
  });
};
