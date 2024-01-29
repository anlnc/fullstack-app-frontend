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
import React, { useCallback, useRef } from "react";
import { useCreateUser } from "../../hooks/UserHooks";

const CreateUserModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOK: () => void;
}> = ({ isOpen, onClose, onOK }) => {
  const { isLoading, createUser } = useCreateUser();

  const fullnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleCreateUser = useCallback(async () => {
    const fullname = fullnameRef.current?.value || "";
    const username = usernameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
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
            inputRef={fullnameRef}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            autoComplete="off"
            inputRef={usernameRef}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            autoComplete="off"
            inputRef={emailRef}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete="off"
            inputRef={passwordRef}
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
