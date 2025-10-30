import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.name.toLowerCase() === name.toLowerCase());

    if (exists) {
      localStorage.setItem("currentUser", JSON.stringify({ name }));
      navigate("/student");
    } else {
      setError("User not found. Please sign up first.");
    }
  };

  const handleAdminLogin = () => {
    localStorage.setItem("currentUser", JSON.stringify({ name: "admin" }));
    navigate("/admin");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

          {/* 👇 The new Admin Login link */}
          <button
            onClick={handleAdminLogin}
            className="mt-4 text-sm text-blue-700 underline hover:text-blue-900"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
