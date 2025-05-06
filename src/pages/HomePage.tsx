import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        pt: 10,
        px: 2,
      }}
    >
      <Typography variant="h2">{t("homepage_title")}</Typography>
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        {t("homepage_description")}
      </Typography>

      <Button component={Link} to="/join" variant="outlined" sx={{ mt: 3 }}>
        {t("homepage_joingame")}
      </Button>
    </Box>
  );
};

export default HomePage;
