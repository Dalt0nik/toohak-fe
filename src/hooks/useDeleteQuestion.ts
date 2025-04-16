import { deleteQuestionById } from "@api/questionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@ui/Toast.tsx";

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const { handleError, showSuccess } = showToast();

  return useMutation({
    mutationFn: deleteQuestionById,
    onSuccess: (_, questionId) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });

      showSuccess("Question deleted successfully");
      console.log(`Question with ID ${questionId} deleted successfully`);
    },
    onError: (error: Error, questionId) => {
      console.error(`Failed to delete question with ID ${questionId}:`, error);
      handleError(error, "Could not delete question");
    },
  });
};
