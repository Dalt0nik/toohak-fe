import { WsQuestion } from "../player/WsQuestionOption";
import { WsEventGeneric } from "../WsEventGeneric";
import { AllEventTypes } from "./WsEventAll";

export interface WsEventNewQuestion
  extends WsEventGeneric<AllEventTypes.NEW_QUESTION> {
  question: WsQuestion;
}
