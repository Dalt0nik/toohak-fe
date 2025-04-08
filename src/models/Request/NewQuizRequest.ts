import { Question } from "./NewQuestionRequest";

export interface NewQuizRequest {
  title: string;
  description: string;
  questions: Question[];
}
