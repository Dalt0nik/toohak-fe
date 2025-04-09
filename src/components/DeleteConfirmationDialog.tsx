import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("QuizPage.confirmDeleteTitle")}</DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ color: "#000", fontWeight: "normal" }}
        >
          {t("QuizPage.confirmDeleteMessage")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("QuizPage.cancelButton")}
        </Button>
        <Button onClick={onDelete} color="error">
          {t("QuizPage.deleteButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
