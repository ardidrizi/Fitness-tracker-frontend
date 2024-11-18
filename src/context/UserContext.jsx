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
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token || !username) {
      authenticateUser();
    }
  }, [token, username]);

  useEffect(() => {
    if (token) getIdsUserFavorite();
  }, [username]);

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

  const getIdsUserFavorite = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/favorite`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      // console.log(">>>> WORKOUTS ::::", response.data.workouts);
      const favoritePromises = response.data.workouts.map((workout) =>
        getUserFavoriteExternalAPI(workout)
      );
      const favoritePromisesResponse = await Promise.all(favoritePromises);
      setFavorites(favoritePromisesResponse.map((e) => e.data));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const getUserFavoriteExternalAPI = async (exerciseId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/exer/` + exerciseId,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching favorites:", error);
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
    favorites,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
