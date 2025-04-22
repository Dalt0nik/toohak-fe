import { NewQuizSessionRequest } from "@models/Request/NewQuizSessionRequest";
import { api } from "./Api";
import { NewQuizSessionResponse } from "@models/Response/NewQuizSessionResponse";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { JoinQuizSessionRequest } from "@models/Request/JoinQuizSessionRequest";
import { JoinQuizSessionResponse } from "@models/Response/JoinQuizSessionResponse";
import { StartQuizSessionRequest } from "@models/Request/StartQuizSessionRequest";

export async function createQuizSession(
  request: NewQuizSessionRequest,
): Promise<NewQuizSessionResponse> {
  const response = await api.post<NewQuizSessionResponse>(
    "/sessions/create",
    request,
  );
  return response.data;
}

export async function findQuizSession(
  joinId: string,
): Promise<QuizSessionResponse> {
  const response = await api.get<QuizSessionResponse>(
    "/sessions/find/" + joinId,
  );

  return response.data;
}

export async function joinQuizSession(
  request: JoinQuizSessionRequest,
): Promise<JoinQuizSessionResponse> {
  const response = await api.post<JoinQuizSessionResponse>(
    "/sessions/join",
    request,
  );
  return response.data;
}

export async function startQuizSession(
  request: StartQuizSessionRequest,
): Promise<number> {
  const response = await api.post("/sessions/start", request);
  return response.status;
}
