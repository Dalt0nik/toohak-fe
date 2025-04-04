import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormTitleField } from "./FormTitleField";
import { FormDescriptionField } from "./FormDescriptionField";
import ImageUpload from "@ui/ImageUpload";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";

const QuizDetailsSection: React.FC = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<NewQuizRequest>();
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (file: File): void => {
    setImage(file);
  };

  useEffect(() => {
    if (image) {
      alert(t("quiz_form_image_successfully_saved"));
    }
  }, [image, t]);

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
