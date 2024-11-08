import axios from "axios";
import { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = ({ username }) => {
  const [workouts, setWorkouts] = useState(null);
  console.log(username);

  useEffect(() => {
    const fetchWorkouts = async () => {
      console.log("fetching workouts", username);
      if (username) {
        const workoutData = await axios.get(
          `http://localhost:5005/api/${username}/workouts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setWorkouts(workoutData.data);
      }
    };

    fetchWorkouts();
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
              {workouts.map((workout) => (
                <li key={workout.id}>{workout.duration}</li>
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
