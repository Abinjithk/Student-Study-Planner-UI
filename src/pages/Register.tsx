import React, { useState } from "react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register data:", { name, email, password });
    // TODO: connect to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[340px] bg-white p-6 rounded-lg shadow-md flex flex-col gap-3"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 text-base border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 text-base border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 text-base border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          type="submit"
          className="mt-2 p-2 text-base bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
