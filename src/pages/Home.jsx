// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Health & Fitness Tracker
      </h1>
      <p className="mb-4">
        Track your workouts, monitor your progress, and stay healthy!
      </p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
