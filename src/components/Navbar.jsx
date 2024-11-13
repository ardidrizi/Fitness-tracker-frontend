import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn, username, setIsLoggedIn }) => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Exercises", path: "/exercises" },
    { title: "Equipment", path: "/equipment" },
  ];

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-white text-lg font-bold hover:text-gray-300"
        >
          Fitness Tracker
        </NavLink>
        <ul className="flex space-x-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path.replace(":id", "1")} // Replace ':id' with a specific ID, e.g., '1'
                className="text-white hover:text-gray-300"
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {isLoggedIn ? (
          <div className="flex space-x-4">
            <span className="text-white">Welcome, {username}</span>
            <button
              className="text-white hover:text-gray-300"
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.removeItem("authToken");
              }} // Remove the authToken from localStorage
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <NavLink to="/login" className="text-white hover:text-gray-300">
              Login
            </NavLink>
            <NavLink to="/register" className="text-white hover:text-gray-300">
              Signup
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
