import { api } from "./Api";

export const registerUser = async (): Promise<void> => {
  const response = await api.post("/users/register");

  if (response.status !== 201 && response.status !== 204) {
    throw new Error(`Unexpected status code: ${response.status}`);
  }
};
