import { Card, CardContent, Typography, Box } from "@mui/material";
import { QuizCardResponse } from "@models/Response/quizCardResponse";

import {
  CARD_BACKGROUND_PURPLE,
  IMAGE_BACKGROUND_LIGHT_PURPLE,
  TEXT_LIGHT_BLUE,
  NO_IMAGE_IMG_URL,
} from "@assets/styles/constants";

interface QuizCardProps {
  quiz: QuizCardResponse;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const quizImage = quiz.imageUrl ?? NO_IMAGE_IMG_URL;

  const lastModified = new Date(quiz.updatedAt).toLocaleDateString();

  return (
    <Card
      sx={{
        height: 300,
        borderRadius: 3,
        backgroundColor: CARD_BACKGROUND_PURPLE,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: 140,
          backgroundColor: IMAGE_BACKGROUND_LIGHT_PURPLE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          m: 2,
          mb: 0,
          borderRadius: 3,
        }}
      >
        <Box
          component="img"
          src={quizImage}
          sx={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          color: TEXT_LIGHT_BLUE,
          p: 2,
          pt: 1,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "left", fontWeight: "bold" }}
        >
          {quiz.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            height: 40,
            textAlign: "left",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {quiz.description}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <Typography variant="caption">
            Last modified: {lastModified}
          </Typography>
          <Typography variant="body2">Q: {quiz.questionAmount}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
