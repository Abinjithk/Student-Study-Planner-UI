const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-700 text-slate-400">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm">
        © {new Date().getFullYear()} StudyPlanner · Built with React & FastAPI
      </div>
    </footer>
  );
};

export default Footer;
