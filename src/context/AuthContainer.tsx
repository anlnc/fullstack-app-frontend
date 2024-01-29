import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      // Check if the token is expired
      const { exp } = jwt_decode(token) as { iat: number; exp: number };
      const isExpired = exp && Date.now() >= exp * 1000;
      if (isExpired) {
        Cookies.remove("token");
        navigate("/login");
        return;
      }

      // Do not go to login page if the user is already logged in
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
