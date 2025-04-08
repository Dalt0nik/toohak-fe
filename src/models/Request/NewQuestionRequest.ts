export interface QuestionOption {
  title: string;
  isCorrect: boolean;
  ordering: number;
}

export interface Question {
  title: string;
  options: QuestionOption[];
}
