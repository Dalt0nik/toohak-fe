// Seperated into component so it's easier to style
// Keep actual logic in QuestionPage

import { Button, Typography } from "@mui/material";

interface AnswerProps extends React.PropsWithChildren {
  onClick: () => void;
  ordering: number;
  disabled: boolean;
}

const ButtonStyling = [
  {
    bgcolor: "#00AEFF",
    "&.MuiButtonBase-root:hover": { bgcolor: "#008ed0" },
  },
  {
    bgcolor: "#FF8282",
    "&.MuiButtonBase-root:hover": { bgcolor: "#ff3939" },
  },
  {
    bgcolor: "#51FF9C",
    "&.MuiButtonBase-root:hover": { bgcolor: "#00f469" },
  },
  {
    bgcolor: "#FFEA61",
    "&.MuiButtonBase-root:hover": { bgcolor: "#ffe012" },
  },
];

const AnswerButton = (props: AnswerProps) => {
  const tlen = typeof props.children === "string" ? props.children.length : 0;
  return (
    <Button
      disabled={props.disabled}
      sx={{
        ...ButtonStyling[props.ordering - 1],
        color: "#000000",
        borderRadius: 3,
        height: { xs: "30vh", md: 150 },
        width: { xs: "37vw", md: 500 },
        m: { xs: 0.5, md: 2 },
        wordBreak: "break-word",
        border: props.disabled ? 10 : 0,
      }}
      disableElevation
      disableRipple
      disableFocusRipple
      onClick={props.onClick}
    >
      <Typography
        sx={{
          fontSize: tlen <= 15 ? 40 : tlen <= 54 ? 30 : 16, // Is there a better way to do this?
        }}
      >
        {props.children}
      </Typography>
    </Button>
  );
};

export default AnswerButton;
