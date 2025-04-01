import { useMutation } from "@tanstack/react-query";
import { createNewQuiz } from "@api/QuizApi";

export const useCreateQuiz = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewQuiz,
    onSuccess: (response: number) => {
      if (response === 201) {
        // When there is a setup to get all quizzes page then this can be used
        // It says that you need to refresh the list because it has changed
        // Otherwise it wil cache the previous quizzes
        // queryClient.invalidateQueries(["quizzes"]);
      }
    },
    onError: (error: Error) => {
      console.error("Error creating quiz:", error.message);
    },
  });
};
