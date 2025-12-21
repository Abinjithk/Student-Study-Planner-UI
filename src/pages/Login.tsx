import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", { email, password });
    // TODO: connect to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[320px] bg-white p-6 rounded-lg shadow-md flex flex-col gap-3"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 text-base border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 text-base border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          className="mt-2 p-2 text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
