import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [exercise, setExercise] = useState("");
  console.log("Exercise data:", exercise);

  const exerciseUrl = "https://exercisedb.p.rapidapi.com";
  const apiKey = import.meta.env.VITE_EXERCISE_API_KEY;

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const exerciseData = await axios.get(exerciseUrl + "/exercises", {
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
          },
        });
        console.log("Exercise data:", exerciseData.data);
        setExercise(exerciseData.data);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };
    fetchExercise();
  }, [apiKey]); // re-run the effect when the apiKey changes

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Health & Fitness Tracker
      </h1>
      <p className="mb-4">
        Track your workouts, monitor your progress, and stay healthy!
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Popular Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercise
            ? exercise.map((exercise, index) => (
                <Link
                  to={`/exercise/${exercise.id}`}
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 block"
                >
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {exercise.name}
                  </h3>
                </Link>
              ))
            : "Loading exercises..."}
        </div>
      </div>
    </div>
  );
};

export default Home;
