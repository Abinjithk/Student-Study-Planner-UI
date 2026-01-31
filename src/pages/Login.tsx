import React, { useState } from "react";
import { jwtDecode }from "jwt-decode";


const API_URL = import.meta.env.VITE_FAST_API_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  interface DecodedToken {
  sub: string;
  role: string;
  email: string;
  name: string;
  exp: number; // optional but recommended
}


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const data = await res.json(); // { access_token, token_type }
    localStorage.setItem("token", data.access_token);

    const decoded = jwtDecode<DecodedToken>(data.access_token);

    // ✅ Store role + email (optional)
    localStorage.setItem("role", decoded.role);
    localStorage.setItem("id", decoded.sub);
    localStorage.setItem("email", decoded.email);
    localStorage.setItem("name", decoded.name);


    window.location.href = "/dashboard";
    setLoading(false);
  } else {
    alert("Invalid login");
    setLoading(false);
  }
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
  disabled={loading}
  className={`mt-2 p-2 text-base rounded transition flex items-center justify-center gap-2
    ${loading
      ? "bg-green-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-800 text-white"
    }`}
>
  {loading ? (
    <>
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Please wait...
    </>
  ) : (
    "Login"
  )}
</button>

      </form>
    </div>
  );
};

export default Login;
