import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { Button, Stack, Typography } from "@mui/material";
import ImageUpload from "@ui/ImageUpload";
import WhiteTextField from "@ui/WhiteTextField";
import { useTranslation } from "react-i18next";

interface QuizFormProps {
  onSubmit: SubmitHandler<NewQuizRequest>;
  isSubmitting: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit, isSubmitting }) => {
  const { t } = useTranslation();
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
    if (image) {
      alert(t("quiz_form_image_successfully_saved"));
    }
  }, [image]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <WhiteTextField
          label={t("quiz_form_title")}
          {...register("title", {
            required: t("quiz_form_title_required"),
            maxLength: { value: 200, message: t("quiz_form_title_maxchar") },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <WhiteTextField
          label={t("quiz_form_description")}
          multiline
          rows={4}
          {...register("description", {
            maxLength: {
              value: maxDescriptionLength,
              message: t("quiz_form_description_maxchar"),
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
          {isSubmitting
            ? t("quiz_form_button_saving")
            : t("quiz_form_button_save")}
        </Button>
      </Stack>
    </form>
  );
};

export default QuizForm;
