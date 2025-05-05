import { PlayerWebSocketEventResponse } from "./PlayerWebSocketEventResponse";
import { QuestionResponse } from "./QuestionSessionResponse";

export interface PlayerNewQuestionEventResponse
  extends PlayerWebSocketEventResponse {
  question: QuestionResponse;
}
