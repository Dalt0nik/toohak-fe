import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginButton from "./components/LoginButton";
import useGetAccessToken from "./components/useGetAccessToken";
import LogoutButton from "./components/LogoutButton";
import { useCookies } from "react-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import Test from "./Test";
import LobbyConnection from "./components/LobbyConnection";
import { WebSocketProvider } from "./contexts/WebSocketContext";

function App() {
  const { isAuthenticated } = useAuth0();
  useGetAccessToken();
  const [cookies] = useCookies();
  const [count, setCount] = useState(0);

  const testAuth = async () => {
    const res = await fetch("http://localhost:8080/api", {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    console.log(await res.text());
  };

  return (
    <>
      <div>
        {isAuthenticated ? (
          <>
            <button onClick={testAuth}>Fetch</button>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route
          path="/websockets"
          element={
            <WebSocketProvider>
              <LobbyConnection />
            </WebSocketProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
