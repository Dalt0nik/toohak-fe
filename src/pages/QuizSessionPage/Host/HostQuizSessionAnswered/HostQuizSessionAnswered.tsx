import AnswerButton from "@components/quizSession/AnswerButton";
import QuestionDisplay from "@components/quizSession/QuestionDisplay";
import { WsQuestion } from "@models/Response/ws/player/WsQuestionOption";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { easeInOut, motion } from "framer-motion";
import Leaderboard from "../Leaderboard/Leaderboard";
import { PlayerScoreResponse } from "@models/Response/PlayerScoreResponse";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { nextQuestion } from "@api/QuizSessionApi";
import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { useTranslation } from "react-i18next";

interface HostQuizSessionAnsweredProps {
  correctQuestionOption: string;
  sessionId: string;
  question: WsQuestion;
  questionNumber: number;
  oldScores: PlayerScoreResponse[];
  newScores: PlayerScoreResponse[];
  onNextQuestionSuccess: () => void;
}

enum SessionAnsweredAnimationState {
  ANSWER,
  LEADERBOARD,
}

const TRANSLATION_ROOT = "QuizSession.Host";

const HostQuizSessionAnswered = ({
  correctQuestionOption,
  sessionId,
  question,
  questionNumber,
  oldScores,
  newScores,
  onNextQuestionSuccess,
}: HostQuizSessionAnsweredProps) => {
  const { t } = useTranslation();
  const [animationState, setAnimationState] =
    useState<SessionAnsweredAnimationState>(
      SessionAnsweredAnimationState.ANSWER,
    );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationState(SessionAnsweredAnimationState.LEADERBOARD);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (sessionId: string) => {
      const status = await nextQuestion(sessionId);
      if (status === 200) {
        onNextQuestionSuccess();
      }
    },
  });

  const handleNewQuestionClick = () => {
    mutate(sessionId);
  };

  if (isPending)
    return (
      <>
        <Typography variant="h5">
          {t(`${TRANSLATION_ROOT}.LoadingQuestion`)}
        </Typography>
        <LoadingBackdrop />
      </>
    );

  return (
    <Box sx={{ overflow: "hidden", p: 1 }}>
      {animationState === SessionAnsweredAnimationState.LEADERBOARD && (
        <motion.div
          initial={{ translateX: "150%" }}
          animate={{
            translateX: "0",
            transition: { duration: 1, type: "spring" },
          }}
        >
          <Stack spacing={2} alignItems={"center"}>
            <Leaderboard oldPoints={oldScores} newPoints={newScores} />
            <Button
              color="primary"
              variant="contained"
              onClick={handleNewQuestionClick}
            >
              {t(`${TRANSLATION_ROOT}.LoadNextQuestionButtonLabel`)}
            </Button>
          </Stack>
        </motion.div>
      )}
      {animationState === SessionAnsweredAnimationState.ANSWER && (
        <>
          <motion.div
            animate={{
              translateY: "-150%",
              transition: { duration: 2, delay: 2, type: "spring" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "flex-start",
                alignItems: "center",
              }}
            >
              <QuestionDisplay
                questionImage={question.imageId ?? ""}
                questionNumber={questionNumber}
                questionTitle={question.title}
                isMobile={false}
              />
            </Box>
          </motion.div>
          <motion.div
            animate={{
              translateY: "150%",
              transition: { duration: 2, delay: 2, type: "spring" },
            }}
          >
            <Grid
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto",
              }}
            >
              {question.questionOptions.map((option) => {
                const isCorrect = option.id === correctQuestionOption;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ scale: 1 }}
                    animate={
                      isCorrect
                        ? {
                            scale: [1, 1.1, 1],
                            transition: {
                              repeat: Infinity,
                              duration: 0.5,
                              times: [0, 0.5, 1],
                              easings: easeInOut,
                            },
                          }
                        : {}
                    }
                  >
                    <AnswerButton
                      ordering={option.ordering}
                      disabled
                      correct={isCorrect}
                      isMobile={false}
                    >
                      {option.title}
                    </AnswerButton>
                  </motion.div>
                );
              })}
            </Grid>
          </motion.div>
        </>
      )}
    </Box>
  );
};

export default HostQuizSessionAnswered;
