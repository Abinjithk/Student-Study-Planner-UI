import Layout from "../components/Layout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Analytics: React.FC = () => {

  // Sample data (replace with API later)
  const studyTimeData = [
    { subject: "Math", hours: 5 },
    { subject: "Physics", hours: 3 },
    { subject: "Chemistry", hours: 4 },
    { subject: "English", hours: 2 },
  ];

  const tasksData = [
    { name: "Completed", value: 20 },
    { name: "Pending", value: 5 },
  ];

  const COLORS = ["#1D4ED8", "#9333EA"];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">📊 Analytics</h1>
          <p className="text-slate-400">
            Track your study progress and focus patterns.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Study Time Bar Chart */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Study Time per Subject (hrs)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studyTimeData}>
                <XAxis dataKey="subject" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="hours" fill="#3B82F6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tasks Completed Pie Chart */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Tasks Completed vs Pending</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={tasksData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {tasksData.map(( _,index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          <StatCard title="Total Study Time" value="14h" subtitle="This week" />
          <StatCard title="Tasks Completed" value="20" subtitle="This week" />
          <StatCard title="Focus Sessions" value="10" subtitle="This week" />
          <StatCard title="Quizzes Taken" value="5" subtitle="This week" />
        </div>

      </div>
    </Layout>
  );
};

export default Analytics;

// ---------------------
// StatCard Component
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
