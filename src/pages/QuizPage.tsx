import { api } from "@api/Api";
import theme from "@assets/styles/theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  CARD_BACKGROUND_PURPLE,
  NO_IMAGE_IMG_URL,
} from "../assets/styles/constants";

import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";

interface Question {
  id: string;
  title: string;
}

interface Quiz {
  id: string;
  createdBy: string;
  title: string;
  description: string;
  questions: Question[] | null;
}

const fetchQuizById = async (id: string): Promise<Quiz> => {
  const { data } = await api.get(`http://localhost:8080/api/quizzes/${id}`);
  console.log(data);
  return data;
};

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz", id],
    queryFn: () => fetchQuizById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <ThemeProvider theme={theme}>
      <Typography
        gap={3}
        variant="h3"
        sx={{
          mb: 3,
          textAlign: "left",
        }}
      >
        {quiz?.title}
        <Button variant="contained"> Edit</Button>
      </Typography>
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 12, sm: 8 }}
          sx={{ backgroundColor: CARD_BACKGROUND_PURPLE }}
        >
          <Box
            component="img"
            src={NO_IMAGE_IMG_URL}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {quiz?.description}
          </Typography>
          <Accordion
            sx={{
              backgroundColor: CARD_BACKGROUND_PURPLE,
              border: "1px solid",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                Total Questions: {quiz?.questions?.length}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {quiz?.questions && quiz.questions.length > 0 ? (
                <List>
                  {quiz.questions.map((q) => (
                    <ListItem key={q.id} sx={{ paddingY: 0 }}>
                      <ListItemText primary={q.title} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="red">
                  There is no questions in this quiz
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Game settings:
            </Typography>
            <Typography>Form for settings</Typography>
            <Button variant="contained"> Start</Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default QuizPage;
