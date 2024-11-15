import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Navbar = () => {
  const { username, logUserOut, getToken } = useUserContext();
  const navLinks = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Favorites", path: "/favorites" },
    { title: "Exercises", path: "/exercises" },
  ];

  return (
    <nav className="bg-green-500 p-4 sticky top-0 z-50">
      <div className="container mx-2 flex justify-between items-center">
        {getToken() ? (
          <div className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/dvuhnvs5c/image/upload/v1697466078/samples/animals/cat.jpg"
              alt="Fitness Tracker"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-xl font-bold text-gray-300">
              Welcome {username}
            </span>
          </div>
        ) : (
          <NavLink
            to="/"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Fitness Tracker
          </NavLink>
        )}
        <ul className="flex space-x-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path.replace(":id", "0")} // Replace ':id' with a specific ID, e.g., '1'
                className="text-white text-xl hover:text-bg-[#ffd700]"
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {getToken() ? (
          <div className="flex space-x-4">
            <button
              className="text-white hover:text-gray-300 py-2 px-5  text-white font-semibold rounded-full shadow-md hover:bg-[#e6c200] focus:outline-none focus:ring focus:ring-[#ffd700] focus:ring-opacity-75"
              onClick={logUserOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <NavLink
              to="/login"
              className="text-white hover:text-gray-300 py-2 px-5  text-white font-semibold rounded-full shadow-md hover:bg-[#e6c200] focus:outline-none focus:ring focus:ring-[#ffd700] focus:ring-opacity-75"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="text-white hover:text-gray-300 py-2 px-5  text-white font-semibold rounded-full shadow-md hover:bg-[#e6c200] focus:outline-none focus:ring focus:ring-[#ffd700] focus:ring-opacity-75"
            >
              Signup
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
