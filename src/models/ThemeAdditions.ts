import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    contrast: {
      text: string;
    };
  }
  // For createTheme()
  interface PaletteOptions {
    // This is used when the background is white
    contrast?: {
      text?: string;
    };
  }
}
