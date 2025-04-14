import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { NewQuizCoverImageRequest } from "@models/Request/NewQuizCoverImageRequest";
import { NewQuizCoverImageResponse } from "@models/Response/NewQuizCoverImageResponse";
import { api } from "@api/Api";
import { QuizResponse } from "@models/Response/quizResponse";
import { NewQuizResponse } from "@models/Response/NewQuizResponse";

export const createNewQuiz = async (
  data: NewQuizRequest,
): Promise<NewQuizResponse> => {
  // Too lazy to make proper response interface
  const response = await api.post("/quizzes", data);
  return { id: response.data.id };
};

export const fetchQuizById = async (id: string): Promise<QuizResponse> => {
  const { data } = await api.get(`/quizzes/${id}`);
  return data;
};

export const newCoverImage = async (
  data: NewQuizCoverImageRequest,
): Promise<NewQuizCoverImageResponse> => {
  const formData = new FormData();
  formData.append("file", data.image);

  const response = await api.post<NewQuizCoverImageResponse>(
    "/files/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const deleteQuizById = async (id: string): Promise<void> => {
  await api.delete(`/quizzes/${id}`);
};

export const fetchImageById = async (id: string): Promise<string> => {
  const response = await api.get(`/files/image/${id}`, {
    responseType: "blob",
  });
  return URL.createObjectURL(response.data);
};
