import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A28C6",
      dark: "#241362",
      light: "#DCD5FD",
    },
    secondary: {
      main: "#2F109E", // Button background color
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#DCD5FD",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', Helvetica, Arial, sans-serif",
    h1: {
      fontFamily: "'Inter', Helvetica",
      fontWeight: 800, // extrabold
      fontSize: "6rem",
      letterSpacing: "-6px",
      color: "#DCD5FD",
    },
    h2: {
      fontFamily: "'Inter', Helvetica",
      fontWeight: 600, // semibold
      fontSize: "4rem", // text-[64px]
      letterSpacing: "-3.2px",
      color: "#DCD5FD",
    },
    h3: {
      fontFamily: "'Inter', Helvetica",
      fontWeight: 600, // extrabold
      fontSize: "3rem", // text-[32px]
      letterSpacing: "-1.6px",
      color: "#DCD5FD",
    },
    h4: {
      fontFamily: "'Inter', Helvetica",
      fontWeight: 600, // semibold
      fontSize: "2rem",
      letterSpacing: "-1.5px",
      color: "#DCD5FD",
    },
    button: {
      fontFamily: "'Roboto', Helvetica",
      fontWeight: 600,
      fontSize: "1.2rem",
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(to bottom, #4A28C6, #241360)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow:
            "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        contained: {
          backgroundColor: "#2F109E",
          "&:hover": {
            backgroundColor: "#421ec1",
          },
        },
        outlined: {
          borderColor: "#DCD5FD",
          borderWidth: "3px",
          color: "#FFFFFF",
          backgroundColor: "rgba(41, 128, 215, 0.03)", // #2980d708
          "&:hover": {
            borderColor: "#FFFFFF",
            backgroundColor: "rgba(41, 128, 215, 0.1)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#241362",
          padding: "5px ",
        },
      },
    },
  },
});
export default theme;
