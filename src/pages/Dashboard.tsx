import Layout from "../components/Layout";

const StatCard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) => (
  <div className="bg-slate-800 rounded-xl p-5">
    <p className="text-slate-400 text-sm">{title}</p>
    <h3 className="text-2xl font-bold my-1">{value}</h3>
    <p className="text-slate-500 text-xs">{subtitle}</p>
  </div>
);

const TaskItem = ({ title, time }: { title: string; time: string }) => (
  <li className="flex items-center justify-between bg-slate-700 rounded-lg px-4 py-3">
    <span>{title}</span>
    <span className="text-slate-400 text-sm">{time}</span>
  </li>
);

const ActivityItem = ({
  text,
  time,
}: {
  text: string;
  time: string;
}) => (
  <div className="flex justify-between">
    <span>{text}</span>
    <span className="text-slate-500">{time}</span>
  </div>
);



const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-slate-400">
            Welcome back 👋 Here’s your study overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCard title="Study Time" value="3h 40m" subtitle="Today" />
          <StatCard title="Tasks Completed" value="5 / 8" subtitle="Today" />
          <StatCard title="Focus Score" value="82%" subtitle="This week" />
          <StatCard title="Quizzes Taken" value="12" subtitle="Total" />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Today's Plan */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">📅 Today’s Study Plan</h2>

            <ul className="space-y-3">
              <TaskItem title="Math – Algebra Practice" time="45 min" />
              <TaskItem title="Physics – Motion Notes" time="30 min" />
              <TaskItem title="Chemistry – Quiz Prep" time="20 min" />
            </ul>

            <button className="mt-4 text-sm text-blue-400 hover:text-blue-300">
              View full planner →
            </button>
          </div>

          {/* Focus Panel */}
          <div className="bg-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">⏱ Focus Session</h2>
              <p className="text-slate-300 mb-6">
                Start a focused study session using Pomodoro.
              </p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold">
              Start Focus Session
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Recent Activity</h2>

          <div className="space-y-3 text-slate-300 text-sm">
            <ActivityItem text="Completed Algebra Quiz" time="2 hours ago" />
            <ActivityItem text="Studied Physics for 30 min" time="Yesterday" />
            <ActivityItem text="Created notes for Chemistry" time="2 days ago" />
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
