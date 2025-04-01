import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { TextField, Button, Stack } from "@mui/material";

interface QuizFormProps {
  onSubmit: SubmitHandler<NewQuizRequest>;
  isSubmitting: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewQuizRequest>({
    defaultValues: {
      createdBy: "d8621080-a2d0-4011-a0d3-e6ae5d7a4f72",
      title: "",
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 200, message: "Max 200 characters" },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Description"
          {...register("description", {
            maxLength: { value: 500, message: "Max 500 characters" },
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </Stack>
    </form>
  );
};

export default QuizForm;
