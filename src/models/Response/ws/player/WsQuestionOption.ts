import { WsQuestionOption } from "./WsQuestion";

export interface WsQuestion {
  id: string;
  quizId: string;
  imageId: string;
  title: string;
  questionOptions: WsQuestionOption[];
}
