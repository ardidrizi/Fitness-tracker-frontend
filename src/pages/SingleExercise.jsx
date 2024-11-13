import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleExercise = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSingleExercise = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_URL + `/api/exercises/${exerciseId}`
      );
      setExercise(data);
    } catch (error) {
      setError("Error fetching exercise data");
      console.error("Error fetching exercise data:", error);
    } finally {
      setLoading(false);
    }
  }, [exerciseId]);

  useEffect(() => {
    fetchSingleExercise();
  }, [fetchSingleExercise]);

  if (loading)
    return <p className="text-center text-gray-500">Loading exercise...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const {
    name,
    gifUrl,
    bodyPart,
    equipment,
    instructions,
    secondaryMuscles,
    target,
  } = exercise;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        {name}
      </h1>

      <div className="flex flex-col md:flex-row md:space-x-8">
        <img
          src={gifUrl}
          alt={name}
          className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0"
        />

        <div className="md:w-1/2 space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Body Part:</span> {bodyPart}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Target Muscle:</span> {target}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Equipment:</span> {equipment}
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">Secondary Muscles</h2>
            <ul className="list-disc list-inside pl-4 text-gray-700">
              {secondaryMuscles.map((muscle, index) => (
                <li key={index}>{muscle}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside pl-4 space-y-2 text-gray-700">
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleExercise;
