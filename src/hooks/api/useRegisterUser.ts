import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@api/userApi";

export const useRegisterUser = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (status: number) => {
      if (status !== 201 && status !== 204) {
        throw new Error(`Unexpected status code: ${status}`);
      }
    },
    onError: (error: Error) => {
      console.error("Error creating quiz:", error.message);
    },
  });
};
