import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AiFeature from "./pages/AiFeature.tsx";
import Analytics from "./pages/Analytics.tsx";
import Focus from "./pages/Focus.tsx";
import Notes from "./pages/Notes.tsx";
import Planner from "./pages/Planner.tsx";
import Admin from "./pages/Admin.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aifeature" element={<AiFeature />} />
        
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/planner" element={<Planner />} />
         <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
