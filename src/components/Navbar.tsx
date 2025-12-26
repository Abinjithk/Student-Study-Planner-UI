import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check token in localStorage
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      // Call FastAPI logout endpoint (optional, if you have one)
      await fetch("http://127.0.0.1:8000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear localStorage and update state
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsAuthenticated(false);

      // Redirect to home or login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-500">
          StudyPlanner
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-slate-300">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/planner" className="hover:text-white transition">
            Planner
          </Link>
          <Link to="/notes" className="hover:text-white transition">
            Notes
          </Link>
          <Link to="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm border border-slate-500 rounded-lg hover:border-slate-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
