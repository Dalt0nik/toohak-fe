import "@assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import CreateQuizPage from "@pages/CreateQuizPage";
import HomePage from "@pages/HomePage.tsx";
import LobbyConnection from "@components/LobbyConnection";
import Navbar from "@components/layout/Navbar.tsx";
import { WebSocketProvider } from "@contexts/WebSocketContext";
import { PrivateAppRoutes } from "@apptypes/PrivateRoutes";
import { PublicAppRoutes } from "@apptypes/PublicRoutes.ts";
import PageNotFound from "@pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path={PublicAppRoutes.HOME} element={<HomePage />} />
        <Route
          path="/websockets"
          element={
            <WebSocketProvider>
              <LobbyConnection />
            </WebSocketProvider>
          }
        />
        <Route
          path={PrivateAppRoutes.CREATE_QUIZ}
          element={<CreateQuizPage />}
        />
        <Route
          path={PublicAppRoutes.PAGE_NOT_FOUND}
          element={<PageNotFound />}
        />
      </Route>
    </Routes>
  );
}

export default App;
