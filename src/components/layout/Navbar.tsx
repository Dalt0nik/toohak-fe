import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { PublicAppRoutes } from "@models/PublicRoutes";
import { Outlet, Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "@ui/LogoutButton.tsx";
import LoginButton from "@ui/LoginButton.tsx";
import { useTranslation } from "react-i18next";
import { NavItem } from "@models/NavItem";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const guestNavItems: NavItem[] = [];
  const userNavItems: NavItem[] = [
    { label: t("navbar_create"), path: PrivateAppRoutes.CREATE_QUIZ },
    { label: t("navbar_myquizzes"), path: PrivateAppRoutes.USER_QUIZZES },
  ];
  const commonNavItems: NavItem[] = [];

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
                sx={{ color: "white", textDecoration: "none" }}
              >
                LOGO
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon sx={{ color: "white" }} />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#241362",
                      color: "fff",
                      width: 220,
                      paddingTop: 2,
                    },
                  }}
                >
                  <List sx={{ width: 250 }}>
                    {navItems.map((item) => (
                      <ListItem key={item.path} disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to={item.path}
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <ListItem sx={{ mt: 2 }}>
                      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                    </ListItem>
                  </List>
                </Drawer>
              </>
            ) : (
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
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default Navbar;
