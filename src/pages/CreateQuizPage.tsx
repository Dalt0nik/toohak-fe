import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import QuizDetailsSection from "@components/quiz/QuizCreation/QuizDetailsSection";
import { useCreateQuiz } from "@hooks/useCreateQuiz";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";

const CreateQuizPage: React.FC = () => {
  const { t } = useTranslation();
  const createQuizMutation = useCreateQuiz();

  const handleCreateQuiz = (data: NewQuizRequest) => {
    createQuizMutation.mutate(data);
  };

  const methods = useForm<NewQuizRequest>({
    defaultValues: {
      createdBy: "d8621080-a2d0-4011-a0d3-e6ae5d7a4f72",
      title: "",
      description: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleCreateQuiz)}>
        <Typography variant="h2" component="h2" align="left" sx={{ mb: 3 }}>
          {t("quiz_form_create_new_quiz")}
        </Typography>
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
          <Grid justifyContent="center" mt={3} sx={{ width: "100%" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createQuizMutation.isPending}
            >
              {createQuizMutation.isPending
                ? t("quiz_form_button_saving")
                : t("quiz_form_button_save")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default CreateQuizPage;
