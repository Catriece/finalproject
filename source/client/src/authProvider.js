import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored_user = JSON.parse(localStorage.getItem("user"));
    if (stored_user) {
      setUser(stored_user);
    }
  }, []);

  const login = ({ user_info, token }) => {
    // LOGIN LOGIC
    setUser({ user_info });
    localStorage.setItem("user", JSON.stringify({ user_info }));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    // LOGOUT LOGIC
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
