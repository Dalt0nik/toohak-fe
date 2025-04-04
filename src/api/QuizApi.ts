import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { NewQuizCoverImageRequest } from "@models/Request/NewQuizCoverImageRequest";
import { NewQuizCoverImageResponse } from "@models/Response/NewQuizCoverImageResponse";
import { api } from "@api/Api";

export const createNewQuiz = async (data: NewQuizRequest): Promise<number> => {
  const response = await api.post<NewQuizRequest>("/quizzes", data);
  return response.status;
};

export const newCoverImage = async (
  data: NewQuizCoverImageRequest,
): Promise<NewQuizCoverImageResponse> => {
  const formData = new FormData();
  if (data.quiz_id) {
    formData.append("quiz_id", data.quiz_id);
  }
  formData.append("image", data.image);

  const response = await api.post<NewQuizCoverImageResponse>(
    "/quizzes/cover-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
