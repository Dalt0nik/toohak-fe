import { api } from "@api/Api";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { AxiosResponse } from "axios";
import { ReactNode, useEffect, useState } from "react";

interface AxiosInterceptorProviderProps {
  children: ReactNode;
}

const AxiosInterceptorProvider = ({
  children,
}: AxiosInterceptorProviderProps) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [isInterceptorSetup, setIsInterceptorSetup] = useState(false);

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

    setTimeout(() => {
      setIsInterceptorSetup(true);
    }, 10);

    return () => {
      setIsInterceptorSetup(false);
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [getAccessTokenSilently, isAuthenticated]);

  return isInterceptorSetup ? children : <LoadingBackdrop />;
};

export default AxiosInterceptorProvider;
