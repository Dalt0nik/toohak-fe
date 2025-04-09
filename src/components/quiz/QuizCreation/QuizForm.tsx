import React, { useState } from "react";
import { Typography, Grid, Button, Box } from "@mui/material";
import QuizDetailsSection from "@components/quiz/QuizCreation/QuizDetailsSection";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import AddQuestionDialog from "@components/quiz/QuizCreation/AddQuestionDialog";
import { Question } from "@models/Request/NewQuestionRequest.ts";
import QuestionList from "@components/quiz/QuizCreation/QuestionList";

interface QuizFormProps {
  onSubmit: (data: NewQuizRequest) => void;
  isSubmitting: boolean;
  autoSubmitQuestion?: boolean;
}

export const QuizForm: React.FC<QuizFormProps> = ({
  onSubmit,
  isSubmitting,
  autoSubmitQuestion = false,
}) => {
  const { t } = useTranslation();

  const [questions, setQuestions] = useState<Question[]>([]);

  const handleSaveQuestion = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);

    if (autoSubmitQuestion) {
      const updatedQuestions = [...questions, newQuestion];
      methods.handleSubmit((data) => {
        onSubmit({ ...data, questions: updatedQuestions });
      })();
    }
  };

  const handleEditQuestion = (updatedQuestion: Question, index: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = updatedQuestion;
      return newQuestions;
    });
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index),
    );
  };

  const methods = useForm<NewQuizRequest>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          onSubmit({ ...data, questions });
        })}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" align="left">
              {t("quiz_form_quiz_details")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <QuizDetailsSection />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" align="left">
              Something else
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>Quiz options and so on</Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" align="left">
              {t("quiz_form_questions")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ textAlign: "left", mb: 2 }}>
              <AddQuestionDialog onSave={handleSaveQuestion} />
            </Box>
            <QuestionList
              questions={questions}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          </Grid>
          <Grid justifyContent="center" mt={3} sx={{ width: "100%" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                fontSize: "1.5rem",
                padding: "16px 32px",
                minWidth: "200px",
              }}
            >
              {isSubmitting
                ? t("quiz_form_button_saving")
                : t("quiz_form_button_save")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
