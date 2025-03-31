import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { AppRoutes } from "../types/routes.ts";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useGetAccessToken from "./useGetAccessToken.tsx";
import LogoutButton from "./LogoutButton.tsx";
import LoginButton from "./LoginButton.tsx";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  useGetAccessToken();
  const { t } = useTranslation();

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
              <Typography
                variant="h4"
                component={RouterLink}
                to={AppRoutes.HOME}
              >
                LOGO
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              {isAuthenticated && (
                <>
                  <Button component={RouterLink} to="">
                    {t("navbar_create")}
                  </Button>
                  <Button component={RouterLink} to="">
                    {t("navbar_browse")}
                  </Button>
                  <Button component={RouterLink} to="">
                    {t("navbar_yourquizzes")}
                  </Button>
                </>
              )}
            </Box>
            <Box>
              {isAuthenticated ? (
                <>
                  <LogoutButton />
                </>
              ) : (
                <LoginButton />
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
