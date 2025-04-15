import { CARD_BACKGROUND_PURPLE } from "@assets/styles/constants";
import theme from "@assets/styles/theme";
import ImageCard from "@components/common/ui/ImageCard";
import { QuestionResponse } from "@models/Response/questionResponse";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Tooltip,
  ListItemText,
} from "@mui/material";
import QuizPageList from "./QuizPageList";
import QuizPageListItem from "./QuizPageListItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";

interface OptionsListProps {
  questions: QuestionResponse[];
}

const OptionsList = ({ questions }: OptionsListProps) => {
  const { t } = useTranslation();

  return questions.length ? (
    questions.map((question) => (
      <Accordion
        sx={{
          backgroundColor: CARD_BACKGROUND_PURPLE,
          border: "1px solid",
          borderRadius: `${theme.borderRadius?.md} !important`,
        }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h4">{question.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {question.questionOptions?.length ? (
            <QuizPageList>
              <ImageCard id={question.imageId} />
              {question.questionOptions.map((q) => (
                <QuizPageListItem key={q.id} sx={{ paddingY: 0 }}>
                  {q.isCorrect ? (
                    <Tooltip title={t("QuizPage.correctAnswerTooltip")}>
                      <CheckCircleIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip title={t("QuizPage.incorrectAnswerTooltip")}>
                      <CancelIcon />
                    </Tooltip>
                  )}
                  <ListItemText primary={q.title} />
                </QuizPageListItem>
              ))}
            </QuizPageList>
          ) : (
            <Typography color="red">{t("QuizPage.noAnswers")}</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    ))
  ) : (
    <Typography color="error">{t("QuizPage.noQuestions")}</Typography>
  );
};
export default OptionsList;
