export interface QuestionOption {
  title: string;
  isCorrect: boolean;
  ordering: number;
}

export interface Question {
  id?: string;
  quizId?: string;
  title: string;
  options: QuestionOption[];
}

export interface QuestionDto {
  id?: string;
  quizId?: string;
  title: string;
  options: QuestionOption[];
}
