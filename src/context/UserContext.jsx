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
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    console.log("AUTHENTICATE USER::::", getToken(), username);
    if (!token || !username) {
      console.log("AUTHENTICATE USER::::called!!");
      authenticateUser();
    }
  }, [token, username]);

  const authenticateUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      storeUsername(response.data.data.username);
      logUserIn();
    } catch (error) {
      console.error(
        "Authentication failed:",
        error.response ? error.response.data : error.message
      );
      logUserOut();
    }
  };

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
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
  };

  const logUserIn = () => {
    setIsLoggedIn(true);
  };

  const logUserOut = () => {
    setIsLoggedIn(false);
    removeToken();
    clearUser();
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

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
