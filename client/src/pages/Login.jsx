import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import Auth Context

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth(); // Get Auth Context

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user/dashboard"); // Redirect if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state before making a request

    try {
      // Call the login method from AuthContext
      await login({ email, password });
      navigate("/user/dashboard"); // Redirect user to dashboard after successful login
    } catch (err) {
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message,
      );
      setError(
        err.response ? err.response.data.message : "Something went wrong!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#e5f9e0]">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#2f9c95]">
          Login
        </h2>

        {/* Display error message */}
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-[#2f9c95]"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-[#2f9c95]"
              placeholder="********"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className={`mt-4 w-full rounded-md bg-[#2f9c95] py-2 text-white hover:bg-[#25877a] ${loading ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Redirect to sign up */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/freelancer/signup" className="text-[#2f9c95] hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
