import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { getSessionCode } from "@api/QuizSessionApi";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [rejoinCode, setRejoinCode] = useState<string | null>(null);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const cookies = new Cookies();
    if (!isAuthenticated && cookies.get("QuizSessionJwt")) {
      getSessionCode()
        .then((code) => {
          setRejoinCode(code);
        })
        .catch(() => {
          cookies.remove("QuizSessionJwt");
          setRejoinCode(null);
        });
    } else {
      setRejoinCode(null);
    }
  }, [isAuthenticated]);

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
        {isAuthenticated
          ? t("homepage_description_host")
          : t("homepage_description_player")}
      </Typography>

      {!isAuthenticated && (
        <Button component={Link} to="/join" variant="outlined" sx={{ mt: 3 }}>
          {t("homepage_joingame")}
        </Button>
      )}

      {rejoinCode && (
        <Button
          variant="outlined"
          component={Link}
          to={`/session/${rejoinCode}`}
          sx={{ mt: 3, ml: 2 }}
        >
          {t("homepage_rejoin", { code: rejoinCode })}
        </Button>
      )}
    </Box>
  );
};

export default HomePage;
