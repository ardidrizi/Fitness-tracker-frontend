import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, username, setIsLoggedIn }) => {
  const [inputUsername, setInputUsername] = useState("");

  const navigate = useNavigate();

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Exercises", path: "/exercises" },
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken && isLoggedIn) {
      setIsLoggedIn(false);
    } else if (storedToken && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, setIsLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

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
                to={link.path}
                className="text-white hover:text-gray-300"
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {isLoggedIn ? (
          <div className="flex space-x-4 items-center">
            <span className="text-white">Welcome, {username || "User"}</span>
            <button
              className="text-white hover:text-gray-300"
              onClick={handleLogout}
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
