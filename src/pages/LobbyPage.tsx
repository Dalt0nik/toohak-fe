import { useAuth0 } from "@auth0/auth0-react";
import LoadingBackdrop from "@components/common/ui/LoadingBackdrop";
import { WebSocketProvider } from "@contexts/WebSocketContext";
import { useEffect, useState } from "react";

const LobbyPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const getToken = async () => {
      setToken(await getAccessTokenSilently());
    };
    getToken();
  }, []);

  return token ? (
    <WebSocketProvider config={{ authorizationHeader: token! }}>
      <div>{token}</div>
    </WebSocketProvider>
  ) : (
    <LoadingBackdrop />
  );
};

export default LobbyPage;
