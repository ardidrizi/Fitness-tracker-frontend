import { useState } from "react";
import Dashboard from "./Dashboard"; // Adjust the import path as necessary
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import the CSS file for styles

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
    <div className="login-container">
      <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>

          <p>Don't have an account?</p>
          <button className="submit" onClick={() => navigate("/register")}>
            Register
          </button>
        </form>

        {isLoggedIn ? <Dashboard username={username} /> : <p>Please log in.</p>}
      </>
    </div>
  );
};

export default Login;
