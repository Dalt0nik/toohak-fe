import { Question } from "@models/Request/NewQuestionRequest.ts";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

interface QuestionProps {
  questions: Question[];
}

export default function QuestionList({ questions }: QuestionProps) {
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
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
              }}
            >
              <ListItemText>
                <Typography variant="h6">{question.question}</Typography>
              </ListItemText>
            </ListItem>
            {index < questions.length - 1 && (
              <Divider sx={{ backgroundColor: "grey" }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
