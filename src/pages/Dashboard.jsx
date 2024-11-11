/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

const Dashboard = ({ username }) => {
  const [workouts, setWorkouts] = useState(null);
  console.log(username);

  const emoji = {
    running: "🏃",
    cycling: "🚴",
    swimming: "🏊",
    strength: "💪",
    yoga: "🧘",
  };

  useEffect(() => {
    const fetchProgress = async () => {
      if (username === "null" || username === "undefined") {
        throw new Error("No user found");
      }

      const workoutData = await axios.get(
        `http://localhost:5005/api/${username}/workouts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setWorkouts(workoutData.data);
    };

    fetchProgress();
  }, [username]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {username}!</h1>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2>Your Workouts</h2>
          {workouts ? (
            <ul>
              {workouts.map((workout, index) => (
                <h2 key={index}>
                  {emoji[workout.workoutType]} {workout.workoutType}
                </h2>
              ))}
            </ul>
          ) : (
            <p>Loading workouts...</p>
          )}
        </section>
        <section className="dashboard-section">
          <h2>Statistics</h2>
          {/* Add content for statistics */}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
