export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  options: QuestionOption[];
}
