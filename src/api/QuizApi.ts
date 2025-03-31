import axios from "axios";

import { Quiz } from "../models/QuizModel";

export const createNewQuiz = async (
  data: Quiz,
  jwt: string,
): Promise<number> => {
  console.log(jwt);
  const response = await axios.post<Quiz>(
    "http://localhost:8080/api/quizzes",
    data,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    },
  );

  return response.status;
};
