import { updateQuestionById } from "@api/questionApi";
import { Question } from "@models/Request/NewQuestionRequest";
import { QuestionResponse } from "@models/Response/questionResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateQuestion = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    QuestionResponse,
    Error,
    { questionId: string; data: Question }
  >({
    mutationFn: ({ questionId, data }) =>
      updateQuestionById(quizId, questionId, data),
    onSuccess: (_, questionId) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });

      console.log(`Question with ID ${questionId} updated successfully`);
    },
    onError: (error: Error, questionId) => {
      console.error(`Failed to update question with ID ${questionId}:`, error);
    },
  });
};
