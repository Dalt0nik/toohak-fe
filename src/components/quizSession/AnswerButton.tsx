// Seperated into component so it's easier to style
// Keep actual logic in QuestionPage

import { Button, Typography, useTheme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import StarIcon from "@mui/icons-material/Star";
import PentagonIcon from "@mui/icons-material/Pentagon";

const TextColor = "#000000";
const IconColor = "#f5f3ff";

interface AnswerProps extends React.PropsWithChildren {
  onClick?: () => void;
  ordering: number;
  disabled?: boolean;
  isMobile?: boolean;
  hostView?: boolean;
  correct?: boolean;
}

interface ButtonStyleInfo {
  color: string;
  bgcolor: string;
}

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
  hostView, // Changes button look for host
  children,
  correct = false,
}: AnswerProps) => {
  const theme = useTheme();
  const tlen = typeof children === "string" ? children.length : 0;
  const AnswerText = !isMobile ? children : "";

  const ButtonStyling: ButtonStyleInfo[] = [
    { color: "#00B7F3", bgcolor: "#008ED0" },
    { color: "#F30000", bgcolor: "#D30000" },
    { color: "#41D61A", bgcolor: "#2E9014" },
    { color: "#F3CC00", bgcolor: "#DFBB00" },
  ];

  return (
    <Button
      disabled={disabled}
      sx={{
        bgcolor: ButtonStyling[ordering - 1].color,
        "&.MuiButtonBase-root:hover": {
          bgcolor: ButtonStyling[ordering - 1].bgcolor,
          color: TextColor,
        },
        "&.Mui-disabled": {
          bgcolor: hostView
            ? ButtonStyling[ordering - 1].color
            : ButtonStyling[ordering - 1].bgcolor,
          color: TextColor,
          outline: hostView ? 0 : 5,
          outlineOpacity: 0.5,
          outlineColor: IconColor,
        },
        color: TextColor,
        borderRadius: 3,
        height: { xs: "30vh", md: 150 },
        width: { xs: "37vw", md: 500 },
        m: { xs: 0.5, md: 2 },
        wordBreak: "break-word",
        "&": {
          ...(correct
            ? {
                outlineColor: `${theme.palette.success.light} !important`,
              }
            : {}),
        },
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
