import { WsQuestion } from "@models/Response/ws/player/WsQuestion.ts";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import QuestionDisplay from "@components/quizSession/QuestionDisplay.tsx";
import AnswerButton from "@components/quizSession/AnswerButton.tsx";
import ScoreBackdrop from "@components/quizSession/ScoreBackdrop";
import { useEffect, useState } from "react";
import AnswersContainer from "@pages/QuizSessionPage/AnswersContainer";

enum PlayerQuizSessionAnsweredAnimationState {
  ANSWER,
  BANNER,
}

const PlayerQuizSessionAnswered = ({
  question,
  questionNumber,
  correctAnswer,
  userScore,
  userPosition,
}: {
  question: WsQuestion;
  questionNumber: number;
  correctAnswer: string | null;
  userScore: number;
  userPosition: number;
}) => {
  const { t } = useTranslation();

  const [animationState, setAnimationState] =
    useState<PlayerQuizSessionAnsweredAnimationState>(
      PlayerQuizSessionAnsweredAnimationState.ANSWER,
    );

  useEffect(() => {
    const t1 = setTimeout(() => {
      setAnimationState(PlayerQuizSessionAnsweredAnimationState.BANNER);
    }, 1000);
    const t2 = setTimeout(() => {
      setAnimationState(PlayerQuizSessionAnsweredAnimationState.ANSWER);
    }, 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <QuestionDisplay
          questionTitle={question.title}
          questionNumber={questionNumber}
          questionImage={question.imageId != null ? question.imageId : ""}
        />

        <AnswersContainer>
          {question.questionOptions.map((option, index) => {
            const isCorrect = option.id === correctAnswer;

            return (
              <AnswerButton
                key={option.id}
                ordering={index + 1}
                disabled={true}
                hostView={true}
                correct={isCorrect}
              >
                {option.title}
              </AnswerButton>
            );
          })}
        </AnswersContainer>
        <Typography variant="body1" sx={{ mt: 3 }}>
          {t("QuizSession.waitingForNextQuestion")}
        </Typography>
      </Box>

      {animationState === PlayerQuizSessionAnsweredAnimationState.BANNER && (
        <ScoreBackdrop score={userScore} position={userPosition} />
      )}
    </>
  );
};

export default PlayerQuizSessionAnswered;
