import { Alert } from "@mui/material";

export default function ErrorAlert({ error }: { error: string }) {
  return (
    <Alert variant="filled" severity="error">
      {error}
    </Alert>
  );
}
