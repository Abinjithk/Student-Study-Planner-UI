import React, { useState } from "react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

   const checkPasswords = (pass: string, confirm: string) => {
    if (pass==confirm){
      return ""
    }else{
      return "Passwords Does Not Match"
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.detail || "Registration failed");
      return;
    }

    const data = await res.json(); // { access_token, token_type }
    localStorage.setItem("token", data.access_token);
     window.location.href = "/dashboard";
    // Redirect to dashboard or login
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordError(checkPasswords(password,e.target.value));
          }}
          required
          className="p-2 text-base border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <div className="text-red-500 text-sm">
          {passwordError}
        </div>

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
