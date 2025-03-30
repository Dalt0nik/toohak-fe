import { QuizDTO } from "../types/quizDTO";
import { QuestionDTO } from "../types/questionDTO";

const mockQuestions: QuestionDTO[] = [
  {
    id: "q1",
    quizId: "1",
    imageId: "img1",
    title: "What is the capital of France?",
  },
  {
    id: "q2",
    quizId: "1",
    imageId: "img2",
    title: "What is the boiling point of water?",
  },
];

const mockQuizzes: QuizDTO[] = [
  {
    id: "1",
    title: "Geography Quiz",
    description: "Test your knowledge of world geography!",
    createdBy: "user-123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: mockQuestions,
  },
  {
    id: "2",
    title: "Science Basics",
    description: "Simple questions to test your science fundamentals.",
    createdBy: "user-456",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [],
  },
  {
    id: "3",
    title: "Geography Quiz",
    description: "Test your knowledge of world geography!",
    createdBy: "user-123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: mockQuestions,
  },
  {
    id: "4",
    title: "Geography Quiz",
    description: "Test your knowledge of world geography!",
    createdBy: "user-123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: mockQuestions,
  },
  {
    id: "5",
    title: "Geography Quiz",
    description: "Test your knowledge of world geography!",
    createdBy: "user-123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: mockQuestions,
  },
  {
    id: "6",
    title: "Geography Quiz",
    description:
      "Test your knowledge of world geography!Test your knowledge of world geography!Test your knowledge of world geography!Test your knowledge of world geography!asdfasfd",
    createdBy: "user-123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: mockQuestions,
  },
  {
    id: "7",
    title: "Geography Quiz",
    description: "Test your knowledge of world geography!",
    createdBy: "user-123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: mockQuestions,
  },
];

export async function fetchQuizList(): Promise<QuizDTO[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuizzes);
    }, 1500);
  });
}
