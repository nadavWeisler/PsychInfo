"use client";
import { createTheme } from "@mui/material/styles";
export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        secondary: {
            main: "#f48fb1",
        },
        success: {
            main: "#42a5f5",
        },
    },

    components: {
        MuiTextField: {
          defaultProps: {
            variant: "outlined", // Default variant for text fields in forms
            fullWidth: true,     // Text fields take full width by default
          },
        },
        // You can add more overrides for other form controls as needed
        // For example, MuiButton, MuiCheckbox, etc.
      },
});

export const formTheme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Adjust the primary color to your liking
    },
    secondary: {
      main: "#f48fb1", // Adjust the secondary color to your liking
    },
    success: {
      main: "#4CAF50", // Adjust the success color to your liking
    },
    error: {
      main: "#f44336", // Adjust the error color to your liking
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});


