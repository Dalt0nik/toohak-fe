import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Question,
  QuestionOption,
} from "@models/Request/NewQuestionRequest.ts";
import { useTranslation } from "react-i18next";
import { normalizeOptions } from "@utils/normalizeOptions";
import { getDefaultOptions } from "@utils/getDefaultOptions";

type QuestionModalProps = {
  onSave: (question: Question) => void;
  initialData?: Question;
  open: boolean;
  onClose: () => void;
};

const QuestionModal = ({
  initialData,
  onSave,
  onClose,
  open,
}: QuestionModalProps) => {
  const { t } = useTranslation();
  const [questionOptions, setQuestionOptions] = useState<QuestionOption[]>(
    normalizeOptions(initialData?.options),
  );
  const [questionTitle, setQuestionTitle] = useState<string>(
    initialData?.title ?? "",
  );

  const handleQuestionChange = (title: string) => {
    setQuestionTitle(title);
  };

  const handleAnswerChange = (index: number, newTitle: string) => {
    setQuestionOptions((prevOption) =>
      prevOption.map((o) =>
        o.ordering === index ? { ...o, title: newTitle } : o,
      ),
    );
  };

  const handleCorrectChange = (index: number) => {
    setQuestionOptions((prev) =>
      prev.map((o) => ({ ...o, isCorrect: o.ordering === index })),
    );
  };

  const handleModalSubmit = () => {
    const options: QuestionOption[] = questionOptions.map((option) => ({
      id: option.id,
      title: option.title,
      ordering: option.ordering,
      isCorrect: option.isCorrect,
    }));
    const questionData: Question = {
      title: questionTitle,
      options: options,
    };
    console.log("question data", questionData);
    onSave(questionData);
    onClose();
  };

  // Resets form state when modal closes
  useEffect(() => {
    if (!open) return;
    const title = initialData?.title ?? "";
    const options = initialData?.options
      ? normalizeOptions(initialData.options)
      : getDefaultOptions();
    setQuestionTitle(title);
    setQuestionOptions(options);
  }, [open, initialData]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            bgcolor: "#4A28C6",
            borderRadius: 2,
            p: 2,
            width: "99%",
            maxWidth: 600,
            boxShadow: 24,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TextField
            margin="dense"
            label="question"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={questionTitle}
            onChange={(e) => handleQuestionChange(e.target.value)}
          />
          <FormControl fullWidth>
            <RadioGroup>
              {questionOptions.map((option) => (
                <Box
                  key={option.ordering}
                  display="flex"
                  alignItems="center"
                  mb={1}
                >
                  <Radio
                    checked={option.isCorrect}
                    onChange={() => handleCorrectChange(option.ordering)}
                  />
                  <TextField
                    fullWidth
                    label={"Option " + option.ordering + " *"}
                    variant="outlined"
                    size="small"
                    value={option.title}
                    onChange={(e) =>
                      handleAnswerChange(option.ordering, e.target.value)
                    }
                  />
                </Box>
              ))}
            </RadioGroup>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <Button onClick={onClose} variant="contained">
                {t("question_dialog_cancel")}
              </Button>
              <Button onClick={handleModalSubmit} variant="contained">
                {t("question_dialog_save")}
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};
export default QuestionModal;
