import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WhiteTextField from "@components/common/ui/WhiteTextField";
import { findQuizSession } from "@api/QuizSessionApi";
import { useMutation } from "@tanstack/react-query";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { PublicAppRoutes } from "@models/PublicRoutes";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  joinId: string;
};

const JoinQuizSessionPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { joinId: "" },
  });

  const findQuizSessionMutation = useMutation({
    mutationFn: (joinId: string) => findQuizSession(joinId),
    onSuccess: (res: QuizSessionResponse) => {
      navigate(
        PublicAppRoutes.JOIN_SESSION_DIRECTLY.replace(":join-id", res.joinId),
      );
    },
    onError: () => {
      setError("joinId", {
        type: "manual",
        message: "Join code not found",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    findQuizSessionMutation.mutate(data.joinId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Enter Join Code
      </Typography>

      <Controller
        name="joinId"
        control={control}
        rules={{
          required: "Join code is required",
          pattern: {
            value: /^[A-Z]+$/,
            message: "Only uppercase letters are allowed",
          },
          minLength: {
            value: 5,
            message: "Join code must be exactly 5 characters",
          },
          maxLength: {
            value: 5,
            message: "Join code must be exactly 5 characters",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <WhiteTextField
            value={value}
            onChange={(e) => {
              // Convert to uppercase and enforce maximum of 5 characters
              let newValue = e.target.value.toUpperCase();
              if (newValue.length > 5) {
                newValue = newValue.slice(0, 5);
              }
              onChange(newValue);
            }}
            placeholder="Enter join code"
            variant="outlined"
            error={Boolean(errors.joinId)}
            helperText={errors.joinId ? errors.joinId.message : ""}
            sx={{ marginBottom: "20px", width: "300px" }}
          />
        )}
      />

      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Join Quiz Session
      </Button>
    </Box>
  );
};

export default JoinQuizSessionPage;
