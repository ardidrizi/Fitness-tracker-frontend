import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = ({ username }) => {
  const [workouts, setWorkouts] = useState(null);
  const [error, setError] = useState(null);

  const emoji = {
    running: "🏃",
    cycling: "🚴",
    swimming: "🏊",
    strength: "💪",
    yoga: "🧘",
  };

  const calculateProgress = (current, total) => {
    return Math.min((current / total) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return "green";
    if (percentage >= 70) return "blue";
    if (percentage >= 50) return "orange";
    return "red";
  };

  useEffect(() => {
    const fetchProgress = async () => {
      if (!username || username === "null" || username === "undefined") {
        setError("No user found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5005/api/${username}/workouts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setWorkouts(response.data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError("Failed to load workouts.");
      }
    };

    fetchProgress();
  }, [username]);

  // Mocked progress data
  const progress = {
    weight: 80,
    bodyFatPercentage: 20,
    totalWorkouts: 5,
    totalDuration: 150, // Duration in minutes
    totalCalories: 500,
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {username || "User"}!
          </h1>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-blue-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Your Workouts
            </h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : workouts ? (
              <ul className="space-y-3">
                {workouts.map((workout, index) => (
                  <li key={index} className="text-lg font-medium text-gray-700">
                    {emoji[workout.workoutType] || "🏋️"} {workout.workoutType}
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
            <p className="text-lg font-medium text-gray-700">
              Total Workouts Progress:
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${calculateProgress(progress.totalWorkouts, 10)}%`,
                  backgroundColor: getProgressColor(
                    calculateProgress(progress.totalWorkouts, 10)
                  ),
                }}
              ></div>
            </div>
            <p className="text-lg font-medium text-gray-700">
              Duration Progress:
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${calculateProgress(progress.totalDuration, 300)}%`,
                  backgroundColor: getProgressColor(
                    calculateProgress(progress.totalDuration, 300)
                  ),
                }}
              ></div>
            </div>
            <p className="text-lg font-medium text-gray-700">
              Calories Burned Progress:
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${calculateProgress(progress.totalCalories, 1000)}%`,
                  backgroundColor: getProgressColor(
                    calculateProgress(progress.totalCalories, 1000)
                  ),
                }}
              ></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
