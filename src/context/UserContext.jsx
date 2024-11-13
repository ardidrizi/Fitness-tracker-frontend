import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

// Define the context
const UserContext = createContext(null);

// Custom hook for easier context access
export const useUserContext = () => useContext(UserContext);

// Provider component
export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((resp) => {
        storeUsername(resp.data.username);
        logUserIn();
      })
      .catch((err) => {
        console.error(err);
        logUserOut();
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const storeUsername = (username) => {
    setUsername(username);
  };

  const clearUser = () => {
    setUsername(null);
  };

  const logUserIn = () => {
    setIsLoggedIn(true);
  };

  const logUserOut = () => {
    setIsLoggedIn(false);
    removeToken();
  };

  const values = {
    username,
    isLoggedIn,
    storeToken,
    getToken,
    removeToken,
    storeUsername,
    clearUser,
    logUserIn,
    logUserOut,
    authenticateUser,
  };

  console.log(getToken(), username, isLoggedIn);
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
