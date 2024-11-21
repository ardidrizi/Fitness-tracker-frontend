import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const token = localStorage.getItem("authToken");

  const fetchExercises = useCallback(async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/exer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExercises(data.results);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const addToFavorites = async (workoutId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5005/api/favorite",
        { workoutId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the JWT token in the Authorization header
          },
        }
      );

      console.log("Workout added to favorites:", response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Workout already favorited"
      ) {
        alert("This workout is already in your favorites!");
      } else {
        console.error(
          "Error adding to favorites:",
          error.response ? error.response.data : error
        );
      }
    }
  };

  const handleExercises = (workoutId) => {
    console.log(`Adding workout ID: ${workoutId}`);
    addToFavorites(workoutId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Health & Fitness Tracker
        </h1>
        <p className="text-gray-600">
          Track your workouts, monitor your progress, and stay healthy!
        </p>
      </header>
      {exercises && exercises.length > 0 ? (
        <section className="mt-8 w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Popular Exercises
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white shadow-md rounded-lg p-6 block hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {exercise.name}
                </h3>
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <button
                  onClick={() => handleExercises(exercise.id)}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Add to Favorite
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p className="text-gray-600">Loading exercises...</p>
      )}
    </div>
  );
};

export default Home;
