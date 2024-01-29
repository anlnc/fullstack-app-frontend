import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserLogin } from "../../hooks/UserHooks";
import CreateUserModal from "../user/CreateUserModal";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useUserLogin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const handleUserCreated = useCallback(async () => {
    setIsModalOpen(false);
    setIsDialogOpen(true);
  }, []);

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
        Don't have an account?&nbsp;
        <Link
          href="#"
          variant="body2"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {"Sign Up"}
        </Link>
        <Button type="submit" fullWidth variant="contained" style={{ marginTop: "1em" }}>
          Login
        </Button>
        <Snackbar open={!!error} autoHideDuration={6000} message={error} />
        <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <CreateUserModal isOpen={isModalOpen} onClose={handleCloseModal} onOK={handleUserCreated} />
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your account has been created. Please log in to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginForm;
