import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = useState(null);

  // Function to Update Token
  const updateToken = async (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    const authStatus = await isAuthenticated();
    setIsAuth(authStatus);
  };

  // Checks if user is authenticated to be on that page
  const isAuthenticated = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return false;
    try {
      const response = await axios.get("http://localhost:5005/authenticate", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      return response.data.authenticated;
    } catch (error) {
      localStorage.removeItem("token");
      return false;
    }
  };

  // useEffect to help check if user is authenticated when the page is loading
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuth, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};