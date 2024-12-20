// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { useUserContext } from "../context/UserContext";
// import { Link } from "react-router-dom";

// const Exercises = () => {
//   const { username } = useUserContext();
//   const [exercises, setExercises] = useState([]);

//   const fetchExercises = useCallback(async () => {
//     try {
//       const { data } = await axios.get(
//         import.meta.env.VITE_SERVER_URL + "/api/exercises"
//       );
//       setExercises(data);
//     } catch (error) {
//       console.error("Error fetching exercise data:", error);
//     }
//   }, [username]);

//   useEffect(() => {
//     fetchExercises();
//   }, [username]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <section className="mt-8 w-full max-w-5xl">
//         <h2 className="text-2xl font-bold mb-4">Popular Exercises</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {exercises.length > 0 ? (
//             exercises.map((exercise) => (
//               <Link
//                 to={`exercise/${exercise.id}`}
//                 key={exercise.id}
//                 className="bg-white shadow-md rounded-lg p-6 block hover:shadow-lg transition"
//               >
//                 <img
//                   src={exercise.gifUrl}
//                   alt={exercise.name}
//                   className="w-full h-48 object-cover rounded-lg mb-4"
//                 />
//                 <h3 className="text-xl font-semibold">{exercise.name}</h3>
//               </Link>
//             ))
//           ) : (
//             <p>Loading exercises...</p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Exercises;
