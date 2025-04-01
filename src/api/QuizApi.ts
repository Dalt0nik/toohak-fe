import axios from "axios";

import { Quiz } from "@models/QuizModel";

export const createNewQuiz = async (data: Quiz): Promise<number> => {
  const response = await axios.post<Quiz>("/quizzes", data);
  return response.status;
};
