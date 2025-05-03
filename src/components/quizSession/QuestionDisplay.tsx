import { Paper, Typography } from "@mui/material";
import ImageCard from "@components/common/ui/ImageCard";
import { useTranslation } from "react-i18next";

interface DisplayProps {
  questionTitle: string;
  questionNumber: number;
  questionImage: string;
  isMobile: boolean;
}

const QuestionDisplay = ({
  questionTitle,
  questionNumber,
  questionImage,
  isMobile = false,
}: DisplayProps) => {
  const { t } = useTranslation();
  return (
    <>
      {!isMobile ? (
        <>
          <Paper
            sx={{
              bgcolor: "text.secondary",
              marginBottom: "10px",
              p: "10px",
            }}
          >
            <Typography
              variant="h3"
              color="#000000"
              sx={{
                marginBottom: "10xpx",
                wordBreak: "break-word",
                fontSize: 35,
              }}
            >
              {questionTitle}
            </Typography>
          </Paper>
          <ImageCard id={questionImage} />
        </>
      ) : (
        <>
          <Paper
            sx={{
              bgcolor: "text.secondary",
              marginBottom: "10px",
              p: "10px",
            }}
          >
            <Typography
              variant="h3"
              color="#000000"
              sx={{
                marginBottom: "10xpx",
                wordBreak: "break-word",
                fontSize: 35,
              }}
            >
              {t("QuizSession.Question", {
                number: questionNumber,
              })}
            </Typography>
          </Paper>
        </>
      )}
    </>
  );
};

export default QuestionDisplay;
