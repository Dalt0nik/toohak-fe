import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./Test";
import LobbyConnection from "./components/LobbyConnection";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import PageNotFound from "./pages/PageNotFound";

import CreateQuiz from "./pages/CreateQuiz";

import Home from "./pages/Home.tsx";
import { AppRoutes } from "./types/routes.ts";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={AppRoutes.TEST} element={<Test />} />
        <Route path={AppRoutes.HOME} element={<Home />} />
        <Route
          path={AppRoutes.WS}
          element={
            <WebSocketProvider>
              <LobbyConnection />
            </WebSocketProvider>
          }
        />
        <Route path={AppRoutes.CREATE} element={<CreateQuiz />} />
        <Route path={AppRoutes.E404} element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
