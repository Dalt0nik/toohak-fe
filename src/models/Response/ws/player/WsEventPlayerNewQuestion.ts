import { QuestionResponse } from "@models/Response/questionResponse";
import { WsEventGeneric } from "../WsEventGeneric";
import { PlayerEventTypes } from "./WsEventPlayer";

export interface WsEventPlayerNewQuestion
  extends WsEventGeneric<PlayerEventTypes.NEW_QUESTION> {
  question: QuestionResponse;
}
