import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
