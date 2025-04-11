import React, { useEffect } from "react";
import { registerUser } from "@api/userApi";
import { useAuth0 } from "@auth0/auth0-react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      registerUser().catch((err) => {
        console.error("Registration error:", err);
      });
    }
  }, [isAuthenticated]);

  return children;
};
