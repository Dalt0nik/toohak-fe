import { QuestionOption } from "@models/Request/NewQuestionRequest";

export const normalizeOptions = (
  input: QuestionOption[] = [],
): QuestionOption[] => {
  console.log("normalize input", input);
  return Array.from({ length: 4 }).map((_, i) => {
    return (
      input[i] ?? {
        title: "",
        isCorrect: false,
        ordering: ++i,
      }
    );
  });
};
