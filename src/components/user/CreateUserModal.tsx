import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useCallback } from "react";
import { useCreateUser } from "../../hooks/UserHooks";

const CreateUserModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOK: () => void;
}> = ({ isOpen, onClose, onOK }) => {
  const { isLoading, createUser } = useCreateUser();

  const handleCreateUser = useCallback(async () => {
    const fullname = (document.getElementById("fullname") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    await createUser({ fullname, username, email, password });
    onOK();
  }, [onOK, createUser]);

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fullname"
            label="Name"
            type="text"
            fullWidth
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateUserModal;
