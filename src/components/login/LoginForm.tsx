import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserLogin } from "../../hooks/UserHooks";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useUserLogin();
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const { email, password } = {
        email: data.get("email") as string,
        password: data.get("password") as string,
      };
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    },
    [login]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="off"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
        />
        <Button type="submit" fullWidth variant="contained" style={{ marginTop: "1em" }}>
          Login
        </Button>
        <Snackbar open={!!error} autoHideDuration={6000} message={error} />
        <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Box>
  );
};

export default LoginForm;
