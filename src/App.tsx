import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./Test";
import Home from "./pages/Home.tsx";
import { AppRoutes } from "./types/routes.ts";
import Navbar from "./components/layout/Layout.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path={AppRoutes.HOME} element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
