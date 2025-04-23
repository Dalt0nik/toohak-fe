import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuiz } from "@api/QuizApi";
import { useNavigate } from "react-router-dom";
import { PrivateAppRoutes } from "@models/PrivateRoutes";

export const useUpdateQuiz = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuiz,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", data.id] });
      navigate(PrivateAppRoutes.QUIZ_PAGE.replace(":id", data.id));
    },
    onError: (error: Error) => {
      console.error("Error editing quiz:", error.message);
    },
  });
};
