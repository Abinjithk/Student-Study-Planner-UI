import Layout from "../components/Layout.tsx";

const Home: React.FC = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Study Smarter, Not Harder 📚
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
          An AI-powered productivity and learning platform to plan your studies,
          stay focused, manage notes, and track progress — all in one place.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-slate-500 hover:border-slate-300 rounded-lg font-semibold transition">
            View Dashboard
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Succeed
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Feature Card */}
          <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition">
            <h3 className="text-xl font-semibold mb-2">📅 Smart Study Planner</h3>
            <p className="text-slate-300">
              Organize subjects, set goals, and plan daily or weekly study sessions.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition">
            <h3 className="text-xl font-semibold mb-2">🧠 AI Study Assistant</h3>
            <p className="text-slate-300">
              Get simple explanations, summaries, flashcards, and quizzes instantly.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition">
            <h3 className="text-xl font-semibold mb-2">⏱️ Focus & Pomodoro</h3>
            <p className="text-slate-300">
              Stay productive with focus sessions, timers, and distraction tracking.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition">
            <h3 className="text-xl font-semibold mb-2">📄 Notes Manager</h3>
            <p className="text-slate-300">
              Create notes, upload PDFs, tag content, and search everything easily.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition">
            <h3 className="text-xl font-semibold mb-2">📊 Progress Analytics</h3>
            <p className="text-slate-300">
              Visualize study time, goal completion, and weekly performance.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition">
            <h3 className="text-xl font-semibold mb-2">🧪 Practice & Quizzes</h3>
            <p className="text-slate-300">
              Test your knowledge with AI-generated quizzes and track your scores.
            </p>
          </div>

        </div>
      </section>

      
    </div>
    </Layout>
  );
};

export default Home;



