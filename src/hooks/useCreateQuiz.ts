import { useMutation } from "@tanstack/react-query";
import { createNewQuiz } from "@api/QuizApi";
import { NewQuizResponse } from "@models/Response/NewQuizResponse";
import { useNavigate } from "react-router-dom";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import { showToast } from "@ui/Toast.tsx";

export const useCreateQuiz = () => {
  const navigate = useNavigate();
  const { handleError, showSuccess } = showToast();

  return useMutation({
    mutationFn: createNewQuiz,
    onSuccess: (response: NewQuizResponse) => {
      showSuccess("Quiz created successfully");
      navigate(PrivateAppRoutes.QUIZ_PAGE.replace(":id", response.id));
    },
    onError: (error: Error) => {
      console.error("Error creating quiz:", error.message);
      handleError(error, "Could not create quiz");
    },
  });
};
