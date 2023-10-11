"use client";
// themes.js
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#5FA2D5",
    },
    secondary: {
      main: "#FF7F9E",
    },
    success: {
      main: "#42a5f5",
    },
  },
  typography: {
    fontFamily: 'Comic Sans MS, cursive',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
  },
});

