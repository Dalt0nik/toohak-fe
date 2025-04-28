import { useState, useEffect } from "react";
import { Typography, Grid, Button, Box } from "@mui/material";
import QuizDetailsSection from "@components/quiz/QuizCreation/QuizDetailsSection";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Question } from "@models/Request/NewQuestionRequest.ts";
import { QuizResponse } from "@models/Response/quizResponse";
import { QuestionResponse } from "@models/Response/questionResponse";
import QuestionsList from "./QuestionsList";
import QuestionModal from "./QuestionModal";
import { useCreateQuestion } from "@hooks/useCreateQuestion";
import { useParams } from "react-router-dom";

type QuizFormProps = {
  initialData: QuizResponse;
  //change
  onSubmit: (data: NewQuizRequest) => void;
};

const EditQuizForm = ({ initialData, onSubmit }: QuizFormProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>(); //quiz id
  const { mutate: createQuestion } = useCreateQuestion();

  const transformQuestions = (
    questionResponses?: QuestionResponse[],
  ): Question[] => {
    if (!questionResponses) return [];

    return questionResponses.map((q) => ({
      id: q.id,
      title: q.title,
      questionOptions: q.questionOptions.map((opt) => ({
        id: opt.id,
        title: opt.title,
        isCorrect: opt.isCorrect,
        ordering: opt.ordering,
      })),
    }));
  };

  const [questions, setQuestions] = useState<Question[]>(
    transformQuestions(initialData?.questions),
  );

  const methods = useForm<NewQuizRequest>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      imageId: initialData?.imageId || undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      methods.reset({
        title: initialData.title,
        description: initialData.description,
      });
      setQuestions(transformQuestions(initialData.questions));
    }
  }, [initialData, methods]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleAddQuestion = (question: Question) => {
    console.log(question, "data to");
    question.quizId = id!;
    createQuestion({
      quizId: id!,
      data: question,
    });
  };

  //fake onsubmit to cimmit changes

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log(data);

            // const questionsWithoutIds = questions.map(({ id, ...rest }) => rest);
            //change on submit for commit
            // onSubmit({ ...data, questions: questionsWithoutIds });
            onSubmit(data);
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
                {t("quiz_form_questions")}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ textAlign: "left", mb: 2 }}>
                <Button onClick={handleOpenModal}>+ ADD NEW QUESTION</Button>
                <QuestionModal
                  onSave={handleAddQuestion}
                  open={open}
                  onClose={() => setOpen(false)}
                />
              </Box>

              <QuestionsList questions={questions} />
            </Grid>
            <Grid justifyContent="center" mt={3} sx={{ width: "100%" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  fontSize: "1.5rem",
                  padding: "16px 32px",
                  minWidth: "200px",
                }}
              >
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};
export default EditQuizForm;
