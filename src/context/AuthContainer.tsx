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
      // @TODO: Remove later
      // If the token was issued before the bug was resolved
      const { iat } = jwt_decode(token) as { iat: number };
      const bugResolvedAt = new Date("2024-01-29T14:41:35.795Z").getTime() / 1000;
      const forceLogout = iat < bugResolvedAt;
      if (forceLogout) {
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
