import { api } from "./Api";

export const deleteQuestionById = async (questionId: string): Promise<void> => {
  try {
    // Endpoint doesn't exist yet
    console.log(
      `MOCK API: DELETE call to URL: ${api.defaults.baseURL}/questions/${questionId}`,
    );

    return Promise.resolve();
  } catch (error) {
    console.error("Error deleting question:", error);
  }
};
