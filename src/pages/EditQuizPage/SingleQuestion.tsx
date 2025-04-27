import { CARD_BACKGROUND_PURPLE } from "@assets/styles/constants";
import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Question } from "@models/Request/NewQuestionRequest";
import { useState } from "react";
import QuestionModal from "./QuestionModal";
import { useUpdateQuestion } from "@hooks/useUpdateQuestion";
import { useParams } from "react-router-dom";

type SingleQuestionProps = {
  question: Question;
  position: number;
};

const SingleQuestion = ({ question, position }: SingleQuestionProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: updateQuestion } = useUpdateQuestion();
  const { id } = useParams<{ id: string }>();
  console.log("data in sinle question", question);

  const handleUpdateQuestion = (question: Question) => {
    console.log(question, "data to");
    updateQuestion({
      quizId: id!,
      id: question.id!,
      data: question,
    });
  };

  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: CARD_BACKGROUND_PURPLE,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          mb: 2,
        }}
      >
        <ListItemText>
          <Typography variant="h6">
            {position}. {question.title}
          </Typography>
        </ListItemText>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EditIcon
            onClick={() => setOpen(true)}
            sx={{ fontSize: 24, cursor: "pointer", color: "black" }}
          />
          <DeleteForeverIcon
            onClick={alert}
            sx={{ fontSize: 24, cursor: "pointer", ml: 1, color: "red" }}
          />
        </Box>
      </ListItem>
      <QuestionModal
        onSave={handleUpdateQuestion}
        initialData={question}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default SingleQuestion;
