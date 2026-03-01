import { useState, useEffect } from "react";
import Layout from "../components/Layout";

const MAIN_API_URL = import.meta.env.VITE_FAST_API_URL;

interface Task {
  id: number;
  title: string;
  subject: string;
  duration: number;
  completed: boolean;
  user_id: number;
  created_at: string;
}

const Planner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = `${MAIN_API_URL}/tasks/`;

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title || !subject) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          subject,
          duration,
          completed: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const newTask = await response.json();
      setTasks([newTask, ...tasks]);

      setTitle("");
      setSubject("");
      setDuration(30);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add task");
    }
  };

  const toggleTask = async (id: number, currentCompleted: boolean) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: !currentCompleted,
        }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-1">Study Planner</h1>
          <p className="text-slate-400">
            Plan your study sessions and stay organized
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Add Task Form */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl h-fit">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-blue-500">➕</span> Add New Task
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. Finish Calculus Lab"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">SUBJECT</label>
                <input
                  type="text"
                  placeholder="e.g. Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 rounded bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 mb-1 block">DURATION (MINUTES)</label>
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full p-2.5 rounded bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <button
                onClick={addTask}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all rounded-lg py-2.5 font-semibold text-white mt-2 shadow-lg shadow-blue-900/20"
              >
                Add to Plan
              </button>
            </div>
          </div>

          {/* Task List Container */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl min-h-[400px]">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-blue-500">📅</span> Your Schedule
            </h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>Loading your tasks...</p>
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-400 text-sm">
                Error: {error}
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
                <p className="text-4xl mb-2">📒</p>
                <p>No tasks planned yet. Start by adding one!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl px-4 py-3.5 transition group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => toggleTask(task.id, task.completed)}
                        className={`w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${task.completed
                          ? "bg-green-500 border-green-500"
                          : "border-slate-500 hover:border-blue-500"
                          }`}
                      >
                        {task.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-semibold text-lg transition-all ${task.completed ? "line-through text-slate-500" : "text-slate-100"
                            }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-sm text-slate-400 flex items-center gap-2">
                          <span className="bg-slate-800 px-2 py-0.5 rounded text-xs text-blue-400 border border-slate-600">{task.subject}</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {task.duration} min
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-slate-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition opacity-0 group-hover:opacity-100"
                      title="Delete Task"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
