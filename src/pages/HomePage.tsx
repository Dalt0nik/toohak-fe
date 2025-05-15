import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getSessionCode } from "@api/QuizSessionApi";
import { useAuth0 } from "@auth0/auth0-react";
import { showToast } from "@components/common/ui/Toast";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { showError } = showToast();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const cookies = useMemo(() => new Cookies(), []);

  const [rejoinCode, setRejoinCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRejoinCode = useCallback(async () => {
    try {
      const code = await getSessionCode();
      setRejoinCode(code);
      return code;
    } catch {
      cookies.remove("QuizSessionJwt");
      setRejoinCode(null);
      return null;
    }
  }, [cookies]);

  useEffect(() => {
    if (!isAuthenticated && cookies.get("QuizSessionJwt")) {
      fetchRejoinCode();
    } else {
      setRejoinCode(null);
    }
  }, [isAuthenticated, cookies, fetchRejoinCode]);

  const handleRejoinClick = async () => {
    setLoading(true);
    const code = await fetchRejoinCode();
    setLoading(false);

    if (code) {
      navigate(`/session/${code}`);
    } else {
      showError(t("homepage_error_rejoin"));
    }
  };

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
          onClick={handleRejoinClick}
          disabled={loading}
          sx={{ mt: 3, ml: 2 }}
        >
          {loading
            ? t("homepage_rejoin_checking")
            : t("homepage_rejoin", { code: rejoinCode })}
        </Button>
      )}
    </Box>
  );
};

export default HomePage;
