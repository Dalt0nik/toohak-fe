import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuizById } from "@api/QuizApi";
import { useNavigate } from "react-router-dom";
import { PrivateAppRoutes } from "@models/PrivateRoutes";

export const useDeleteQuiz = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteQuizById(id),
    onSuccess: () => {
      navigate(PrivateAppRoutes.USER_QUIZZES);
      queryClient.invalidateQueries({ queryKey: ["quizList"] });
    },
    onError: (error: Error) => {
      console.error("Error deleteting quiz:", error.message);
    },
  });
};
