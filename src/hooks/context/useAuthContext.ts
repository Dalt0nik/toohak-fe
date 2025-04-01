import { createContext, useContext } from "react";

interface AuthContextValuesType {
  getAccessToken: () => string;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValuesType>({
  getAccessToken: () => "",
  isAuthenticated: false,
});

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext must be inside AuthContext provider");
  return authContext;
};
