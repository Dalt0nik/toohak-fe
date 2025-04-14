import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRegisterUser } from "@hooks/api/useRegisterUser";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuthenticated } = useAuth0();

  const { mutate } = useRegisterUser();

  useEffect(() => {
    if (isAuthenticated) mutate();
  }, [isAuthenticated, mutate]);

  return children;
};
