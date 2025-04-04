import { styled, TextField } from "@mui/material";

const WhiteTextField = styled(TextField)(({ theme }) => {
  const contrastColor = theme.palette.contrast.text;
  return {
    backgroundColor: theme.palette.background.default,
    "& .MuiInputBase-input": {
      color: contrastColor,
    },
    "& .MuiInputLabel-root": {
      color: contrastColor,
      "&.Mui-focused": {
        color: contrastColor,
      },
      "&.Mui-error": {
        color: "error.main",
      },
    },
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
      },
    },
  };
});

export default WhiteTextField;
