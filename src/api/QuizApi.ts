import axios, { AxiosResponse } from "axios";

import { Quiz } from "@models/QuizModel";

export const createNewQuiz = async (data: Quiz): Promise<AxiosResponse> => {
  return await axios.post<Quiz>("/api/quizzes", data);
};
