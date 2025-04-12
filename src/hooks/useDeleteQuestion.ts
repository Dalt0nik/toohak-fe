import { deleteQuestionById } from "@api/questionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuestionById,
    onSuccess: (_, questionId) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });

      console.log(`Question with ID ${questionId} deleted successfully`);
    },
    onError: (error: Error, questionId) => {
      console.error(`Failed to delete question with ID ${questionId}:`, error);
    },
  });
};
