import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CallInitiator from "./components/CallInitiator";
import Login from "./components/Login";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/calls" element={<CallInitiator />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
