import React from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { FormTitleField } from "@components/quiz/QuizCreation/controllers/FormTitleField";
import { FormDescriptionField } from "@components/quiz/QuizCreation/controllers/FormDescriptionField";
import { FormImageUploadField } from "./controllers/FormImageUploadField";

const QuizDetailsSection: React.FC = () => {
  const { control } = useFormContext<NewQuizRequest>();

  return (
    <Stack spacing={2}>
      <FormTitleField control={control} />
      <FormDescriptionField control={control} />
      <FormImageUploadField control={control} />
    </Stack>
  );
};

export default QuizDetailsSection;
