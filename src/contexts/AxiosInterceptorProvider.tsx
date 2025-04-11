import { api } from "@api/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { AxiosResponse } from "axios";
import { ReactNode, useEffect } from "react";

interface AxiosInterceptorProviderProps {
  children: ReactNode;
}

const AxiosInterceptorProvider = ({
  children,
}: AxiosInterceptorProviderProps) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      async (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [getAccessTokenSilently, isAuthenticated]);
  return children;
};

export default AxiosInterceptorProvider;
