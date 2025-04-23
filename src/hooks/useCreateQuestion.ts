import { createQuestion } from "@api/questionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", data.quizId] });

      console.log(`Question with ID ${data.id} created successfully`);
    },
    onError: (error: Error) => {
      console.error("Error creating question:", error.message);
    },
  });
};
