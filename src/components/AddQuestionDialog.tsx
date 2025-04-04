import React from "react";
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
import { useState, useEffect } from "react";

interface AddQuestionDialogProps {
  onSave: (question: Question) => void;
  initialData?: Question;
  open?: boolean;
  onClose?: () => void;
}

export default function AddQuestionDialog({
  onSave,
  initialData,
  open,
  onClose,
}: AddQuestionDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const dialogOpen = typeof open === "boolean" ? open : internalOpen;

  const { t } = useTranslation();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("0");

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setOptions(initialData.options.map((opt) => opt.text));
      const idx = initialData.options.findIndex((opt) => opt.isCorrect);
      setCorrectAnswer(idx.toString());
    } else {
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("0");
    }
  }, [initialData, dialogOpen]);

  const handleClickOpen = () => {
    if (open === undefined) {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const questionOptions: QuestionOption[] = options.map((option, index) => ({
      text: option,
      isCorrect: index === parseInt(correctAnswer),
    }));

    const questionData: Question = {
      question: question,
      options: questionOptions,
    };

    console.log("Question Data:", questionData);
    onSave(questionData);
    handleClose();
  };

  return (
    <React.Fragment>
      {open === undefined && (
        <Button variant="outlined" onClick={handleClickOpen}>
          {t("add_question")}
        </Button>
      )}

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="question"
              label={t("question")}
              type="text"
              fullWidth
              variant="outlined"
              value={question}
              onChange={handleQuestionChange}
              required
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
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      variant="outlined"
                      size="small"
                      fullWidth
                      label={t("question_option", { number: index + 1 })}
                      required
                    />
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              {t("cancel")}
            </Button>
            <Button type="submit" variant="contained">
              {t("save")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
