import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import Navbar from "./components/Navbar";
import SingleExercise from "./pages/SingleExercise";
import AboutPage from "./pages/About page";

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") === "true" ? false : true
  );
  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", isLoggedIn);
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
        <Route
          path="/exercises/exercise/:exerciseId"
          element={<SingleExercise />}
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
