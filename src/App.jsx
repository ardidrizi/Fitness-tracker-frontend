import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import Navbar from "./components/Navbar";
import SingleExercise from "./pages/SingleExercise";
import AboutPage from "./pages/AboutPage";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedUsername && storedIsLoggedIn) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    } else {
      setUsername("");
      setIsLoggedIn(false);
    }
  }, []);

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
