import { useAuth0 } from "@auth0/auth0-react";
import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { WebSocketProvider } from "@contexts/WebSocketContext";
import React, { useEffect, useState } from "react";

const LobbyPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const getToken = async () => {
      setToken(await getAccessTokenSilently());
    };
    getToken();
  }, []);

  console.log(token);

  return token ? (
    <WebSocketProvider config={{ authorizationHeader: token! }}>
      <div>{token}</div>
    </WebSocketProvider>
  ) : (
    <LoadingBackdrop />
  );
};

export default LobbyPage;
