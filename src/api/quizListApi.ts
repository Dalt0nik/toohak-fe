import { QuizCardDTO } from "../types/quizCardDTO";
import { api } from "./Api";

export async function fetchQuizList(): Promise<QuizCardDTO[]> {
  const response = await api.get<QuizCardDTO[]>("/quizzes");
  return response.data;
}
