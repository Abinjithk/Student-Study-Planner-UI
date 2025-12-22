import { useState } from "react";
import Layout from "../components/Layout";

interface Task {
  id: number;
  title: string;
  subject: string;
  duration: number;
  completed: boolean;
}

const Planner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(30);

  const addTask = () => {
    if (!title || !subject) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        subject,
        duration,
        completed: false,
      },
    ]);

    setTitle("");
    setSubject("");
    setDuration(30);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Study Planner</h1>
          <p className="text-slate-400">
            Plan your study sessions and stay organized
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Add Task */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">➕ Add Task</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 focus:outline-none"
              />

              <input
                type="number"
                min={10}
                step={10}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2 rounded bg-slate-700 focus:outline-none"
              />

              <button
                onClick={addTask}
                className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 font-semibold"
              >
                Add to Plan
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">📅 Today’s Tasks</h2>

            {tasks.length === 0 ? (
              <p className="text-slate-400">No tasks planned yet.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between bg-slate-700 rounded-lg px-4 py-3"
                  >
                    <div>
                      <p
                        className={`font-medium ${
                          task.completed ? "line-through text-slate-400" : ""
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-sm text-slate-400">
                        {task.subject} • {task.duration} min
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
