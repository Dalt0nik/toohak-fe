import { newCoverImage } from "@api/QuizApi";
import { NewQuizCoverImageResponse } from "@models/Response/NewQuizCoverImageResponse";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useUploadCoverImage = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: newCoverImage,
    onSuccess: (data: NewQuizCoverImageResponse) => {
      return data;
    },
    onError: (error: Error) => {
      console.error("Error uploading image:", error);
      alert(t("quiz_form_image_error"));
    },
  });
};
