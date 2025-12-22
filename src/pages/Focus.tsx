import { useState, useEffect } from "react";
import Layout from "../components/Layout";

const Focus: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const toggleTimer = () => setIsRunning(!isRunning);

  useEffect(() => {
    let timer:number;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setTimeLeft(25 * 60);
      setSessions((prev) => prev + 1);
      alert("Pomodoro session complete! Take a break.");
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-1">⏱ Focus Timer</h1>
          <p className="text-slate-400">
            Stay focused with the Pomodoro technique
          </p>
        </div>

        {/* Timer */}
        <div className="bg-slate-800 rounded-xl p-10 flex flex-col items-center justify-center space-y-6">
          <span className="text-6xl font-bold">{formatTime(timeLeft)}</span>
          <button
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-lg font-semibold ${
              isRunning ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <p className="text-slate-400">
            Sessions completed today: <span className="font-semibold">{sessions}</span>
          </p>
        </div>

        {/* Info / Tips */}
        <div className="mt-10 bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">💡 Tips for Focus</h2>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            <li>Work in short bursts (25-30 min) followed by breaks.</li>
            <li>Turn off notifications while studying.</li>
            <li>Track completed sessions to stay motivated.</li>
          </ul>
        </div>

      </div>
    </Layout>
  );
};

export default Focus;
