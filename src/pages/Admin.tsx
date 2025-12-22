import { useState, useEffect } from "react";
import Layout from "../components/Layout";

interface User {
  id: number;
  name: string;
  email: string;
  registeredAt: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Simulate fetching users (replace with API call)
  useEffect(() => {
    const mockUsers: User[] = [
      { id: 1, name: "Alice", email: "alice@example.com", registeredAt: "2025-12-21" },
      { id: 2, name: "Bob", email: "bob@example.com", registeredAt: "2025-12-20" },
      { id: 3, name: "Charlie", email: "charlie@example.com", registeredAt: "2025-12-19" },
    ];
    setUsers(mockUsers);
  }, []);

  const deleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
      // TODO: Call API to delete user from backend
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">🛠 Admin Panel</h1>
          <p className="text-slate-400">
            Manage users and view platform activity.
          </p>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800 rounded-xl p-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left border-b border-slate-600">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Registered At</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700 transition">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.registeredAt}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-slate-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Platform Stats (Optional) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <StatCard title="Total Users" value={users.length.toString()} />
          <StatCard title="Active Sessions" value="12" />
          <StatCard title="Tasks Created" value="45" />
          <StatCard title="Notes Created" value="30" />
        </div>

      </div>
    </Layout>
  );
};

export default Admin;

// ---------------------
// Reusable StatCard
const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-slate-800 rounded-xl p-5 text-center">
    <p className="text-slate-400 text-sm">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </div>
);
