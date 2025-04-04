import React from "react";
import { useState } from "react";
import { Question } from "@models/Request/NewQuestionRequest.ts";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import AddQuestionDialog from "@components/AddQuestionDialog.tsx";
import {
  CARD_BACKGROUND_PURPLE,
  EDIT_BUTTON_IMG,
  DELETE_BUTTON_IMG,
} from "@assets/styles/constants";

interface QuestionListProps {
  questions: Question[];
  onEditQuestion: (updatedQuestion: Question, index: number) => void;
  onDeleteQuestion: (index: number) => void;
}

export default function QuestionList({
  questions,
  onEditQuestion,
  onDeleteQuestion,
}: QuestionListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingIndex(null);
  };

  const handleSaveEditedQuestion = (updatedQuestion: Question) => {
    if (editingIndex !== null) {
      onEditQuestion(updatedQuestion, editingIndex);
    }
    handleEditDialogClose();
  };

  if (questions.length === 0) {
    return <Typography variant="body1">No questions added yet.</Typography>;
  }
  return (
    <Box sx={{ width: "100%", maxHeight: 200, overflowY: "auto" }}>
      <List>
        {questions.map((question, index) => (
          <React.Fragment key={index}>
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
                <Typography variant="h6">{question.question}</Typography>
              </ListItemText>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={EDIT_BUTTON_IMG}
                  alt="Edit"
                  onClick={() => handleEditClick(index)}
                  sx={{ width: 24, height: 24, cursor: "pointer" }}
                />
                <Box
                  component="img"
                  src={DELETE_BUTTON_IMG}
                  alt="Delete"
                  onClick={() => onDeleteQuestion(index)}
                  sx={{ width: 24, height: 24, cursor: "pointer", ml: 1 }}
                />
              </Box>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      {editingIndex !== null && (
        <AddQuestionDialog
          isOpen={editDialogOpen}
          initialData={questions[editingIndex]}
          onClose={handleEditDialogClose}
          onSave={handleSaveEditedQuestion}
        />
      )}
    </Box>
  );
}
