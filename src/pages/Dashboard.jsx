// import { useEffect, useState } from "react";
// import { getUserProgress } from "../api"; // Adjust the import path as necessary

// const Dashboard = ({ username }) => {
//   const [progress, setProgress] = useState(null);

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const userProgress = await getUserProgress(username);
//         setProgress(userProgress);
//       } catch (error) {
//         console.error("Error fetching user progress:", error);
//       }
//     };

//     fetchProgress();
//   }, [username]);

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       {progress ? (
//         <div>
//           <h3>Welcome, {username}!</h3>
//           <p>Your progress: {progress}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
