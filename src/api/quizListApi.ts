import { QuizCardResponse } from "../models/Response/quizCardResponse";
import { api } from "./Api";

export async function fetchQuizList(): Promise<QuizCardResponse[]> {
  const response = await api.get<QuizCardResponse[]>("/quizzes");
  return response.data;
}
