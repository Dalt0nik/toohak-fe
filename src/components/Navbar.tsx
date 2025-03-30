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

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  useGetAccessToken();

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
                  <Button
                    component={RouterLink}
                    to=""
                    sx={{ color: "secondary", mx: 1 }}
                  >
                    Create
                  </Button>
                  <Button
                    component={RouterLink}
                    to=""
                    sx={{ color: "white", mx: 1 }}
                  >
                    Browse
                  </Button>
                  <Button
                    component={RouterLink}
                    to=""
                    sx={{ color: "white", mx: 1 }}
                  >
                    Your Quizzes
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
    </>
  );
};

export default Navbar;
