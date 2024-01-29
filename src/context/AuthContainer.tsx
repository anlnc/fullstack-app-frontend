import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (url === "/login") {
        navigate("/");
      }
    }
  }, [navigate, token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token }}>{children}</AuthContext.Provider>
  );
};

export default AuthContainer;
