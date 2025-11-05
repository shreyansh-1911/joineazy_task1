import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 400));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(
      (u) => u.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      // create fake token with expiry 1 hour
      const token = btoa(
        JSON.stringify({
          name,
          exp: Date.now() + 60 * 60 * 1000,
        })
      );

      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify({ name }));

      navigate("/student");
    } else {
      setError("User not found. Please sign up first.");
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    // create fake admin token
    const token = btoa(
      JSON.stringify({
        name: "admin",
        exp: Date.now() + 60 * 60 * 1000,
      })
    );
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify({ name: "admin" }));
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to continue to your dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          <button
            onClick={handleAdminLogin}
            className="mt-6 w-full py-2.5 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-all"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
