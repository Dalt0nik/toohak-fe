import { deleteQuestionById } from "@api/questionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteQuestion = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: string) => deleteQuestionById(quizId, questionId),
    onSuccess: (_, questionId) => {
      // queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });

      console.log(`Question with ID ${questionId} deleted successfully`);
    },
    onError: (error: Error, questionId) => {
      console.error(`Failed to delete question with ID ${questionId}:`, error);
    },
  });
};
