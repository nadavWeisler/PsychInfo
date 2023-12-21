export const stylesObj = {
  iconBtn: {
    width: "auto",
    position: "absolute",
    left: 0,
  },
  root: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
  },
  menu: {
    maxHeight: 48 * 4.5 + 8,
    width: 250,
  },
  textField: {
    "& label.Mui-focused": {
      color: "#0f0f0f",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0f0f0f",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#0f0f0f",
      },
      "&:hover fieldset": {
        borderColor: "#0f0f0f",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0f0f0f",
      },
    },
  },
  theme: {
    palette: {
      secondary: {
        main: "#0f0f0f",
      },
    },
  },
  box: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
  },
  button: {
    mt: 3,
    mb: 2,
    mr: "45%",
    width: "10%",
  },
};
