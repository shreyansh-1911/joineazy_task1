import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (name.toLowerCase() === "admin") {
      setError("The name 'admin' is reserved. Please choose another name.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(
      (u) => u.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      setError("User already exists. Please login instead.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      users.push({ name });
      localStorage.setItem("users", JSON.stringify(users));
      setLoading(false);
      alert("Signup successful! Please login now.");
      navigate("/login");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-1">Join us and start your journey</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            disabled={loading}
          />

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
