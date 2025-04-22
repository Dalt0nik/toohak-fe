import "@assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import CreateQuizPage from "@pages/CreateQuizPage";
import HomePage from "@pages/HomePage.tsx";
import PageNotFound from "@pages/PageNotFound";
import LobbyConnection from "@components/LobbyConnection";
import Navbar from "@components/layout/Navbar.tsx";
import QuizList from "@pages/QuizList";
import { WebSocketProvider } from "@contexts/WebSocketContext";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import { PublicAppRoutes } from "@models/PublicRoutes";
import QuizPage from "@pages/QuizPage/QuizPage";
import EditQuizPage from "@pages/EditQuizPage";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path={PublicAppRoutes.HOME} element={<HomePage />} />
        <Route
          path={PrivateAppRoutes.LOBBY}
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
        <Route path={PrivateAppRoutes.USER_QUIZZES} element={<QuizList />} />
        <Route
          path={PublicAppRoutes.PAGE_NOT_FOUND}
          element={<PageNotFound />}
        />
        <Route path={PrivateAppRoutes.QUIZ_PAGE} element={<QuizPage />} />
        <Route
          path={PrivateAppRoutes.EDIT_QUIZ_PAGE}
          element={<EditQuizPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
