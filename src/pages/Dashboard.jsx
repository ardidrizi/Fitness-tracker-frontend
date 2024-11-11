/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {username}!
          </h1>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-blue-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Your Workouts
            </h2>
            {workouts ? (
              <ul className="space-y-3">
                {workouts.map((workout, index) => (
                  <li key={index} className="text-lg font-medium text-gray-700">
                    {emoji[workout.workoutType]} {workout.workoutType}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Loading workouts...</p>
            )}
          </section>

          <section className="bg-green-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Statistics
            </h2>
            {/* Add content for statistics */}
            <p className="text-gray-500">Statistics content will go here.</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
