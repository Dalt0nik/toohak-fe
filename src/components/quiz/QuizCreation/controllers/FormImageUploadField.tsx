import React from "react";
import { Controller, Control } from "react-hook-form";
import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { useTranslation } from "react-i18next";
import { useUploadCoverImage } from "@hooks/useUploadCoverImage";
import { Box, Button, Typography } from "@mui/material";
import ImageUpload from "@components/common/ui/ImageUpload";
import { NewQuizCoverImageResponse } from "@models/Response/NewQuizCoverImageResponse";
import { CoverImagePreview } from "./CoverImagePreview";

interface FormImageUploadFieldProps {
  control: Control<NewQuizRequest>;
}

export const FormImageUploadField: React.FC<FormImageUploadFieldProps> = ({
  control,
}) => {
  const { t } = useTranslation();
  const uploadCoverImageMutation = useUploadCoverImage();

  const handleImageUpload = async (
    image: File,
    onChange: (value: string | undefined) => void,
  ) => {
    const data: NewQuizCoverImageResponse =
      await uploadCoverImageMutation.mutateAsync({
        image: image,
      });
    onChange(data.imageId);
  };

  return (
    <Controller
      name="imageId"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Typography variant="h5" align="left">
            {t("quiz_form_image_upload")}
          </Typography>
          {!field.value ? (
            <ImageUpload
              onImageUpload={(image: File) =>
                handleImageUpload(image, field.onChange)
              }
            />
          ) : (
            <Box
              mt={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
            >
              <CoverImagePreview imageId={field.value} />
              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                color="error"
                onClick={() => field.onChange(undefined)}
              >
                {t("quiz_form_image_remove")}
              </Button>
            </Box>
          )}
          {error && <span>{error.message}</span>}
        </>
      )}
    />
  );
};
