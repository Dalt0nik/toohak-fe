import { QuestionDTO } from "./questionDTO";

export interface QuizDTO {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  questions?: QuestionDTO[];
}
