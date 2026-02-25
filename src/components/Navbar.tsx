import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface UserInfo {
  name: string;
  role: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));

        setUser({
          name: decoded.name,
          role: decoded.role,
        });

        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("http://127.0.0.1:8000/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } finally {
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-500">
          StudyPlanner
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-slate-300">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/planner" className="hover:text-white">Planner</Link>
          <Link to="/notes" className="hover:text-white">Notes</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user && (
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full
                bg-slate-900/70 backdrop-blur border border-slate-800">
  <div className="text-left">
    <div className="text-sm font-semibold text-white">
      {user.name}
    </div>
    <div className="text-xs text-slate-400">
      {user.role}
    </div>
  </div>
</div>

          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="px-4 py-2 text-sm border rounded-lg">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm bg-blue-600 rounded-lg">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-600 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
<div className="md:hidden flex items-center gap-4">
 {isAuthenticated && user && (
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full
                bg-slate-900/70 backdrop-blur border border-slate-800">
  <div className="text-left">
    <div className="text-sm font-semibold text-white">
      {user.name}
    </div>
    <div className="text-xs text-slate-400">
      {user.role}
    </div>
  </div>
</div>

          )}
            {/* Mobile Menu Button */}
        <button
          className=" text-slate-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
</div>
       

      
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-slate-300">
          <Link to="/" className="block">Home</Link>
          <Link to="/planner" className="block">Planner</Link>
          <Link to="/notes" className="block">Notes</Link>
          <Link to="/dashboard" className="block">Dashboard</Link>

          

          {!isAuthenticated ? (
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                className="flex-1 text-center py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
