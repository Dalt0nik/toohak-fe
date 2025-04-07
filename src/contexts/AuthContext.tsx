import React, { useEffect } from "react";
import useGetAccessToken from "@hooks/useGetAccessToken";
import { AuthContext } from "@hooks/context/useAuthContext";
import { registerUser } from "@api/userApi";
import { Cookies } from "react-cookie";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getAccessToken, isAuthenticated } = useGetAccessToken();
  const cookies = new Cookies();

  useEffect(() => {
    if (isAuthenticated) {
      const checkForToken = () => {
        const token = cookies.get("jwt");
        if (token) {
          registerUser().catch((err) => {
            console.error("Registration error:", err);
          });
        } else {
          console.warn("JWT token not available yet, retrying...");
          setTimeout(checkForToken, 500);
        }
      };
      checkForToken();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ getAccessToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
