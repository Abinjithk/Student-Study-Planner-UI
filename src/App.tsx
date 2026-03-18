import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/protectedRoute.tsx";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // or use your auth state
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aifeature"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AiFeature />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/focus"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Focus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planner"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Planner />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
