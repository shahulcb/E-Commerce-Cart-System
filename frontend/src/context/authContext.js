import React, { createContext, useEffect, useState } from "react";
import { instance } from "../api/axiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("authenticated");
    return savedAuth === "true";
  });

  const login = () => {
    setAuthenticated(true);
    localStorage.setItem("authenticated", "true");
  };

  const logout = async () => {
    try {
      setUser(null);
      setAuthenticated(false);
      localStorage.removeItem("authenticated");
      const response = await instance.get("logout");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (authenticated) {
      const fetchMe = async () => {
        try {
          const response = await instance.get("/me");
          setUser(response.data.user);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      fetchMe();
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider value={{ user, authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
