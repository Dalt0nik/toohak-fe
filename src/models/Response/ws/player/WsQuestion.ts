import { WsQuestionOption } from "./WsQuestionOption";

export interface WsQuestion {
  id: string;
  imageId: string;
  title: string;
  questionOptions: WsQuestionOption[];
}
