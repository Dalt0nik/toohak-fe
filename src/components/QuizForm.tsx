import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { Button, Stack, Typography } from "@mui/material";
import ImageUpload from "@ui/ImageUpload";
import FormTextField from "@ui/FormTextField";

interface QuizFormProps {
  onSubmit: SubmitHandler<NewQuizRequest>;
  isSubmitting: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit, isSubmitting }) => {
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewQuizRequest>({
    defaultValues: {
      createdBy: "d8621080-a2d0-4011-a0d3-e6ae5d7a4f72",
      title: "",
      description: "",
    },
  });

  const maxDescriptionLength = 500;
  const descriptionValue = watch("description");

  const handleImageUpload = (file: File): void => {
    setImage(file);
  };

  useEffect(() => {
    console.log("Updated image:", image);
  }, [image]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormTextField
          label="Title"
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 200, message: "Max 200 characters" },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <FormTextField
          label="Description"
          multiline
          rows={4}
          {...register("description", {
            maxLength: {
              value: maxDescriptionLength,
              message: "Max 500 characters",
            },
          })}
          slotProps={{
            htmlInput: { maxLength: maxDescriptionLength },
          }}
          error={!!errors.description}
          helperText={
            errors.description
              ? errors.description.message
              : `${descriptionValue?.length || 0} / ${maxDescriptionLength}`
          }
          fullWidth
        />
        <Typography variant="h5" align="left">
          Upload cover picture
        </Typography>
        <ImageUpload onImageUpload={handleImageUpload} />
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
