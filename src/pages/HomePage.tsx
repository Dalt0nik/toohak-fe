import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        textAlign: "left",
      }}
    >
      <Typography variant="h1">{t("homepage_title")}</Typography>
      <Typography variant="h3" gutterBottom>
        {t("homepage_description")}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          marginTop: "1rem",
        }}
      >
        {t("homepage_joingame")}
      </Button>
    </Box>
  );
};

export default HomePage;
