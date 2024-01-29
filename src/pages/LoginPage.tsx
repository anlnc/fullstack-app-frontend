import { Container, Toolbar } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("token");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Toolbar />
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
