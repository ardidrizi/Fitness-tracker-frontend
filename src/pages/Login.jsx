import { useState } from "react";
// import Dashboard from "./Dashboard"; // Adjust the import path as necessary
import axios from "axios";

const Login = () => {
  //   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5005/auth/login", {
        password,
        email,
      });
      console.log("Login response:", response.data);
      //   setUsername(response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </>
    </div>
  );
};

export default Login;
