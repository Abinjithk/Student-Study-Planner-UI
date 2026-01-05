import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<{
    id: number;
    name: string;
    email: string;
    created_at: string;
  }[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =======================
     Fetch Users
  ======================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
          
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch("http://127.0.0.1:8000/admin/get_all_users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* =======================
     Delete User
  ======================= */
  const deleteUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("access_token");

      await fetch(`http://localhost:8000/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(prev => prev.filter(user => user.id !== id));
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">🛠 Admin Panel</h1>
          <p className="text-slate-400">Manage users and view platform activity.</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-slate-400 py-10">
            Loading users...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-600/20 text-red-400 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && (
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
                  <tr
                    key={user.id}
                    className="border-b border-slate-700 hover:bg-slate-700 transition"
                  >
                    <td className="py-2 px-4">{user.id}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.created_at}</td>
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
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <StatCard title="Total Users" value={users.length.toString()} />
          <StatCard title="Active Sessions" value="—" />
          <StatCard title="Tasks Created" value="—" />
          <StatCard title="Notes Created" value="—" />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;

/* =======================
   Stat Card
======================= */
const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-slate-800 rounded-xl p-5 text-center">
    <p className="text-slate-400 text-sm">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </div>
);
