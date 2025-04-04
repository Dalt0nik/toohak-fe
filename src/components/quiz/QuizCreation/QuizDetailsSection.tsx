import React from "react";
import { Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormTitleField } from "./FormTitleField";
import { FormDescriptionField } from "./FormDescriptionField";
import ImageUpload from "@ui/ImageUpload";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useUploadCoverImage } from "@hooks/useUploadCoverImage";

const QuizDetailsSection: React.FC = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<NewQuizRequest>();
  const uploadCoverImageMutation = useUploadCoverImage();

  const handleImageUpload = async (image: File) => {
    if (image) {
      const result = await uploadCoverImageMutation.mutateAsync({
        image: image,
      });
      console.log(result.image_url);
    }
  };

  return (
    <Stack spacing={2}>
      <FormTitleField control={control} />
      <FormDescriptionField control={control} />
      <Typography variant="h5" align="left">
        {t("quiz_form_image_upload")}
      </Typography>
      <ImageUpload onImageUpload={handleImageUpload} />
    </Stack>
  );
};

export default QuizDetailsSection;
