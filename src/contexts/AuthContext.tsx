import useGetAccessToken from "@components/useGetAccessToken";
import { AuthContext } from "@hooks/context/useAuthContext";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getAccessToken, isAuthenticated } = useGetAccessToken();

  return (
    <AuthContext.Provider
      value={{ getAccessToken, isAuthenticated }}
      children={children}
    />
  );
};
