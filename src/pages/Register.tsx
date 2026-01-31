import React, { useState } from "react";
import { jwtDecode }from "jwt-decode";


const API_URL = import.meta.env.VITE_FAST_API_URL;

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
   const [loading, setLoading] = useState(false);

     interface DecodedToken {
  sub: string;
  role: string;
  email: string;
  name: string;
  exp: number; // optional but recommended
}


   const checkPasswords = (pass: string, confirm: string) => {
    if (pass==confirm){
      return ""
    }else{
      return "Passwords Does Not Match"
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.detail || "Registration failed");
      setLoading(false);
      return;
    }

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
    // Redirect to dashboard or login
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
      setLoading(false);
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
    "Create Account"
  )}
</button>
      </form>
    </div>
  );
};

export default Register;
