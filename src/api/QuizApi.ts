import axios from "axios";

import { NewQuizRequest } from "@models/Request/NewQuizRequest";

export const createNewQuiz = async (data: NewQuizRequest): Promise<number> => {
  const response = await axios.post<NewQuizRequest>("/quizzes", data);
  return response.status;
};
