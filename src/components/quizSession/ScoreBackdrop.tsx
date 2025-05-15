import { useTranslation } from "react-i18next";
//import {useState} from "react";
import { Backdrop, Box, Slide, Typography } from "@mui/material";

interface ScoreProps {
  score: number;
  position: number;
}

const ScoreBackdrop = ({ score, position }: ScoreProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Backdrop open={true}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box>
            <Typography variant="h3" gutterBottom>
              {t("Score.score", {
                score: score,
              })}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {t("Score.position", {
                position: position,
              })}
            </Typography>
          </Box>
        </Slide>
      </Backdrop>
    </>
  );
};

export default ScoreBackdrop;
