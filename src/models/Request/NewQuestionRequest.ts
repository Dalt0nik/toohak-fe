export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id?: string;
  question: string;
  options: QuestionOption[];
}
