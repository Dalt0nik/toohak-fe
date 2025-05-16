import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Question,
  QuestionOption,
} from "@models/Request/NewQuestionRequest.ts";
import { useTranslation } from "react-i18next";
import ImageUpload from "@components/common/ui/ImageUpload";
import { NewQuestionImageResponse } from "@models/Response/NewQuestionImageResponse";
import { useUploadQuestionImage } from "@hooks/useUploadQuestionImage";

interface AddQuestionDialogProps {
  onSave: (question: Question) => void;
  initialData?: Question;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AddQuestionDialog({
  onSave,
  initialData,
  isOpen,
  onClose,
}: AddQuestionDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const dialogIsOpen = isOpen ?? internalOpen;

  const { t } = useTranslation();

  const uploadQuestionImageMutation = useUploadQuestionImage();

  const [question, setQuestion] = useState("");
  const [imageId, setImageId] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("0");
  // const [isNewImage, setIsNewImage] = useState(false); TEMP

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.title);
      setOptions(initialData.questionOptions.map((opt) => opt.title));
      const idx = initialData.questionOptions.findIndex((opt) => opt.isCorrect);
      setCorrectAnswer(idx.toString());
    } else {
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("0");
    }
  }, [initialData, dialogIsOpen]);

  const handleClickOpen = () => {
    if (isOpen === undefined) {
      setInternalOpen(true);
    }
  };

  const handleClose = () => {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("0");
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCorrectAnswer(event.target.value);
  };

  const handleLocalSubmit = () => {
    const questionOptions: QuestionOption[] = options.map((option, index) => ({
      title: option,
      ordering: index + 1,
      isCorrect: index === parseInt(correctAnswer),
    }));

    const questionData: Question = {
      title: question,
      imageId: imageId,
      questionOptions: questionOptions,
    };

    onSave(questionData);
    handleClose();
  };

  // If this dialog is closed without pressing save it should automatically delete the image
  // Right now it just keeps it in the database forever
  const handleImageUpload = async (
    image: File,
    // TEMP
    //onChange: (value: string | undefined) => void,
  ) => {
    const data: NewQuestionImageResponse =
      await uploadQuestionImageMutation.mutateAsync({
        image: image,
      });
    setImageId(data.imageId);
    //setIsNewImage(true); TEMP
  };

  return (
    <React.Fragment>
      {isOpen === undefined && (
        <Button variant="outlined" onClick={handleClickOpen}>
          {t("quiz_form_add_question")}
        </Button>
      )}

      <Dialog open={dialogIsOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label={t("question_dialog_question")}
            type="text"
            fullWidth
            variant="outlined"
            value={question}
            onChange={handleQuestionChange}
            required
          />
          <ImageUpload
            onImageUpload={(image: File) => handleImageUpload(image)}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }} fullWidth>
            <RadioGroup
              aria-label="correct-answer"
              name="correct-answer"
              value={correctAnswer}
              onChange={handleCorrectAnswerChange}
            >
              {options.map((option, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <Radio value={index.toString()} />
                  <TextField
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    label={t("question_dialog_question_option", {
                      number: index + 1,
                    })}
                    required
                  />
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            {t("question_dialog_cancel")}
          </Button>
          <Button onClick={handleLocalSubmit} variant="contained">
            {t("question_dialog_save")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
