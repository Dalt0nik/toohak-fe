// src/App.tsx
import LobbyConnection from './components/LobbyConnection';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/websockets" element={<LobbyConnection />} />
      </Routes>
    </Router>
  );
}

export default App;
