import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { PublicAppRoutes } from "@models/PublicRoutes";
import { Outlet, Link as RouterLink } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "@ui/LogoutButton.tsx";
import LoginButton from "@ui/LoginButton.tsx";
import { useTranslation } from "react-i18next";
import { NavItem } from "@models/NavItem";
import { PrivateAppRoutes } from "@models/PrivateRoutes";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const { t } = useTranslation();

  const guestNavItems: NavItem[] = [];
  const userNavItems: NavItem[] = [
    { label: t("navbar_create"), path: PrivateAppRoutes.CREATE_QUIZ },
    { label: t("navbar_myquizzes"), path: PrivateAppRoutes.USER_QUIZZES },
  ];
  const commonNavItems: NavItem[] = [
    { label: t("navbar_joinquiz"), path: PublicAppRoutes.JOIN_SESSION },
  ];

  const navItems = isAuthenticated
    ? [...commonNavItems, ...userNavItems]
    : [...commonNavItems, ...guestNavItems];
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
              <Typography
                variant="h4"
                component={RouterLink}
                to={PublicAppRoutes.HOME}
              >
                LOGO
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  variant="contained"
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                >
                  {item.label}
                </Button>
              ))}
              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default Navbar;
