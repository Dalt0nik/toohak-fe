export interface QuestionOption {
  title: string;
  isCorrect: boolean;
  ordering: number;
}

export interface Question {
  id?: string;
  title: string;
  options: QuestionOption[];
}
