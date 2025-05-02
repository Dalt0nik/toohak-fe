// Seperated into component so it's easier to style
// Keep actual logic in QuestionPage

import { Button, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import StarIcon from "@mui/icons-material/Star";
import PentagonIcon from "@mui/icons-material/Pentagon";

const TextColor = "#000000";
const IconColor = "#f5f3ff";

interface AnswerProps extends React.PropsWithChildren {
  onClick: () => void;
  ordering: number;
  disabled: boolean;
  isMobile: boolean;
}

const ButtonStyling = [
  {
    bgcolor: "#00b7f3",
    "&.MuiButtonBase-root:hover": { bgcolor: "#008ed0", color: TextColor },
    "&.Mui-disabled": {
      bgcolor: "#008ed0",
      color: TextColor,
      outlineColor: IconColor,
      outlineOpacity: 0.5,
    },
  },
  {
    bgcolor: "#f30000",
    "&.MuiButtonBase-root:hover": { bgcolor: "#d30000", color: TextColor },
  },
  {
    bgcolor: "#41d61a",
    "&.MuiButtonBase-root:hover": { bgcolor: "#2e9014", color: TextColor },
  },
  {
    bgcolor: "#f3cc00",
    "&.MuiButtonBase-root:hover": { bgcolor: "#DFBB00", color: TextColor },
  },
];

const IconStyling = {
  color: IconColor,
  position: { xs: "static", md: "relative" },
  fontSize: { xs: "7rem", md: "3rem" },
  opacity: { xs: 1, md: 1 },
};

const ButtonIcon = [
  <CircleIcon sx={IconStyling} />,
  <StarIcon sx={IconStyling} />,
  <SquareIcon sx={IconStyling} />,
  <PentagonIcon sx={IconStyling} />,
];

const AnswerButton = ({
  ordering,
  disabled,
  isMobile,
  onClick,
  children,
}: AnswerProps) => {
  const tlen = typeof children === "string" ? children.length : 0;
  const AnswerText = !isMobile ? children : "";
  return (
    <Button
      disabled={disabled}
      sx={{
        ...ButtonStyling[ordering - 1],
        color: TextColor,
        borderRadius: 3,
        height: { xs: "30vh", md: 150 },
        width: { xs: "37vw", md: 500 },
        m: { xs: 0.5, md: 2 },
        wordBreak: "break-word",
        outline: disabled ? 5 : 0,
      }}
      disableElevation
      disableRipple
      disableFocusRipple
      onClick={onClick}
    >
      {ButtonIcon[ordering - 1]}
      <Typography
        sx={{
          fontSize: tlen <= 15 ? 40 : tlen <= 54 ? 30 : 16, // Is there a better way to do this?
          zIndex: 1,
        }}
      >
        {AnswerText}
      </Typography>
    </Button>
  );
};

export default AnswerButton;
