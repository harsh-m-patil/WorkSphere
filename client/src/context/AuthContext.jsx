import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

// Create AuthContext
const AuthContext = createContext();

// Provide AuthContext to the entire app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial load, check if the user is logged in
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true, // Send the cookie with the request
        });

        if (response.data.status === "success") {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Log in function
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setUser(response.data.user);
      localStorage.setItem("authToken", response.data.token); // Store token
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      console.log("useAuth");
      await axios.post(
        `${API_URL}/users/logout`,
        {},
        { withCredentials: true },
      );
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext in any component
export const useAuth = () => useContext(AuthContext);
