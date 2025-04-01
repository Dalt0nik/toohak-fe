import "@assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import CreateQuiz from "@pages/CreateQuiz";
import Home from "@pages/Home.tsx";
import LobbyConnection from "@components/LobbyConnection";
import Navbar from "@components/layout/Navbar.tsx";
import { WebSocketProvider } from "@contexts/WebSocketContext";
import { PrivateAppRoutes } from "@apptypes/PrivateRoutes";
import { PublicAppRoutes } from "@apptypes/PublicRoutes.ts";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path={PublicAppRoutes.HOME} element={<Home />} />
        <Route
          path="/websockets"
          element={
            <WebSocketProvider>
              <LobbyConnection />
            </WebSocketProvider>
          }
        />
        <Route path={PrivateAppRoutes.CREATE_QUIZ} element={<CreateQuiz />} />
      </Route>
    </Routes>
  );
}

export default App;
