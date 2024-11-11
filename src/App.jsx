import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import Navbar from "./components/Navbar";

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "false" ? false : true
  );

  console.log("setisLoggedIn:", setIsLoggedIn);

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", isLoggedIn);

    console.log("username:", username);
    console.log("isLoggedIn:", isLoggedIn);
  }, [username, isLoggedIn]);

  return (
    <>
      <Navbar
        username={username}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard username={username} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/login"
          element={
            <Login
              username={username}
              setUsername={setUsername}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
