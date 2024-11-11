import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Fitness Tracker</div>
        <ul className="flex space-x-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                activeClassName={({ isActive }) => (isActive ? "active" : "")}
                className="text-white hover:text-gray-300"
                // onClick={handleLinkClick}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
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
