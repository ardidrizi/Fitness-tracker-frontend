import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import Navbar from "./components/Navbar";
import SingleExercise from "./pages/SingleExercise";
import AboutPage from "./pages/AboutPage";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/exercises/exercise/:exerciseId"
            element={<SingleExercise />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
