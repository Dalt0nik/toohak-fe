import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import { useCallback, useState } from "react";

import { Quiz } from "@models/QuizModel";
import { createNewQuiz } from "@api/QuizApi";

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState<Quiz>({
    createdBy: "d8621080-a2d0-4011-a0d3-e6ae5d7a4f72",
    title: "",
    description: "",
  });

  const handleChangeValue = useCallback((key: string, value: string) => {
    setQuizData((data) => ({ ...data, [`${key}`]: value }));
  }, []);

  const handleCreateNewQuiz = useCallback((data: Quiz) => {
    console.log(data);
    createNewQuiz(data).then((response) => {
      if (response.status === 201) {
        console.log(":D");
      }
    });
  }, []);

  /*
   * All of the layout is temporary while we have no UI theme
   * Laid out everything based on prototype, but the actual structure could be different
   * If you want to add a new section (ex. questions) do:
   *  <Grid item xs={4} align="left"> </Grid>
   *  <Grid item xs={6} align="left"> <Stack spacing={2}> </Stack> </Grid>
   * Stack will create a list like structure, spacing subject to change
   *
   *
   */

  return (
    <>
      <div>
        <Typography align="left">
          <h1> Create new quiz </h1>
        </Typography>
      </div>
      <div>
        <Grid
          container
          columns={10}
          direction="row"
          alignItems="flex-start"
          sx={{ mb: 5 }}
        >
          <Grid item xs={4}>
            <Typography>
              <h2> Quiz Details </h2>
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <Stack spacing={2}>
              <Typography>
                <h3> Title </h3>
              </Typography>
              <TextField
                required
                value={quizData.title}
                id="quiz-title"
                variant="outlined"
                helperText={quizData.title.length + "/200"}
                slotProps={{ htmlInput: { maxLength: 200 } }}
                onChange={(e) => handleChangeValue("title", e.target.value)}
              />
              <Typography>
                <h3> Description </h3>
              </Typography>
              <TextField
                value={quizData.description}
                id="quiz-description"
                variant="outlined"
                helperText={quizData.description.length + "/500"}
                slotProps={{ htmlInput: { maxLength: 500 } }}
                onChange={(e) =>
                  handleChangeValue("description", e.target.value)
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </div>

      <div>
        <Button
          variant="contained"
          disabled={!quizData.title}
          onClick={() => handleCreateNewQuiz(quizData)}
        >
          SAVE
        </Button>
      </div>
    </>
  );
};

export default CreateQuiz;
