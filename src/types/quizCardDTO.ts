export interface QuizCardDTO {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  questionAmount: number;
}
