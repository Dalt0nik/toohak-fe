import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./Test";
import LobbyConnection from "./components/LobbyConnection";
import { WebSocketProvider } from "./contexts/WebSocketContext";

import CreateQuiz from "./pages/CreateQuiz";

import Home from "./pages/Home.tsx";
import { AppRoutes } from "./types/routes.ts";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path={AppRoutes.HOME} element={<Home />} />
        <Route
          path="/websockets"
          element={
            <WebSocketProvider>
              <LobbyConnection />
            </WebSocketProvider>
          }
        />
        <Route path="/create" element={<CreateQuiz />} />
      </Routes>
    </>
  );
}

export default App;
