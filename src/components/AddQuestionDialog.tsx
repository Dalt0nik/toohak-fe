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

interface QuestionProps {
  onSave: (question: Question) => void;
}

export default function AddQuestionDialog({ onSave }: QuestionProps) {
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = React.useState("0");
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("0");
    setOpen(false);
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

    onSave(questionData);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {t("add_question")}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
