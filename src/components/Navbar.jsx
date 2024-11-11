import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Exercises", path: "/exercises/:id" }, // Added Exercises link with dynamic ID
  ];

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          activeClassName={({ isActive }) => (isActive ? "active" : "")}
          className="text-white text-lg font-bold hover:text-gray-300"
        >
          Fitness Tracker
        </NavLink>
        <ul className="flex space-x-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path.replace(":id", "1")} // Replace ':id' with a specific ID, e.g., '1'
                activeClassName={({ isActive }) => (isActive ? "active" : "")}
                className="text-white hover:text-gray-300"
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <NavLink
            to="/login"
            activeClassName={({ isActive }) => (isActive ? "active" : "")}
            className="text-white hover:text-gray-300"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            activeClassName={({ isActive }) => (isActive ? "active" : "")}
            className="text-white hover:text-gray-300"
          >
            Signup
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Add the following CSS to your global stylesheet or a CSS module
// .active {
//   color: #FFD700; /* Gold color for active link */
//   font-weight: bold;
// }
