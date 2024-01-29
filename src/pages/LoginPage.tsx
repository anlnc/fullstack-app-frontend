import { Container, Toolbar } from "@mui/material";
import React from "react";
import LoginForm from "../components/login/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Toolbar />
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
