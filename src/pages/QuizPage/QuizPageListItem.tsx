import { ListItem, styled } from "@mui/material";

const QuizPageListItem = styled(ListItem)(({ theme }) => {
  return {
    paddingLeft: theme.spacing(1),
    gap: theme.spacing(1),
    "&:nth-child(2n + 2)": {
      background: `${theme.palette.primary.dark}50`,
      display: "flex",
    },
    "&.MuiListItem-root span": {
      ...theme.typography.h5,
    },
  };
});

export default QuizPageListItem;
