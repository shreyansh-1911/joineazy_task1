import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
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

    users.push({ name });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login now.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border p-3 rounded-lg mb-2 focus:outline-blue-500"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
