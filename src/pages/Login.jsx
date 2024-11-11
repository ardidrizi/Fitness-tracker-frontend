import { useState } from "react";
import Dashboard from "./Dashboard"; // Adjust the import path as necessary
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ username, setUsername }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  if (localStorage.getItem("authToken")) {
    navigate("/dashboard");
  }

  const fetchWorkouts = async () => {
    try {
      const response = await axios.post("http://localhost:5005/auth/login", {
        username,
        email,
        password,
      });
      console.log("Login response:", response.data);
      if (localStorage.getItem("authToken")) {
        setIsLoggedIn(true);
      }
      localStorage.setItem("authToken", response.data.authToken);
      setIsLoggedIn(true);
      setUsername(response.data.username);
      navigate("/dashboard");
      if (response.data.authToken) {
        localStorage.setItem("authToken", response.data.authToken);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchWorkouts();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p className="text-center text-gray-600 mt-4">
            Don&lsquo;t have an account?
          </p>
          <button
            className="w-full text-blue-500 font-semibold py-2 rounded-lg hover:text-blue-600 transition duration-300"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </form>
        {isLoggedIn ? (
          <Dashboard username={username} />
        ) : (
          <p className="text-center text-red-500 mt-4">Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default Login;
