import { Card, CardContent, Typography, Box } from "@mui/material";
import { QuizDTO } from "../types/quizDTO";

interface QuizCardProps {
  quiz: QuizDTO;
}

const MAIN_PURPLE = "rgb(83, 65, 150)";
const LIGHT_PURPLE = "rgb(103, 85, 170)";
const TEXT_BLUE = "rgb(220, 213, 253)";

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const quizImage = quiz.imageUrl?.trim() ? quiz.imageUrl : "/no_image.png";

  const lastModified = new Date(quiz.updatedAt).toLocaleDateString();

  return (
    <Card
      sx={{
        height: 300,
        borderRadius: 3,
        backgroundColor: MAIN_PURPLE,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: 140,
          backgroundColor: LIGHT_PURPLE,
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
          color: TEXT_BLUE,
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
          <Typography variant="body2">
            Q: {quiz.questions?.length ?? 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
