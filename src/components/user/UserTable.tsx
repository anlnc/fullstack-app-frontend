import DeleteIcon from "@mui/icons-material/Delete";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDeleteUser } from "../../hooks/UserHooks";
import { UserModel } from "../../models/UserModel";

interface UserTableProps {
  users: UserModel[];
  onUserUpdated: () => void;
}

interface UserTableRowProps {
  user: UserModel;
  onUserUpdated: () => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, onUserUpdated }) => {
  const { isLoading, deleteUser } = useDeleteUser();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = useCallback(async () => {
    await deleteUser(user.email);
    onUserUpdated();
    handleClose();
  }, [deleteUser, user.email]);

  return (
    <>
      <TableRow>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.fullname}</TableCell>
        <TableCell>
          <IconButton onClick={handleOpen}>
            <DeleteIcon color="secondary" />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this user?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </TableCell>
      </TableRow>
      <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

const UserTable: React.FC<UserTableProps> = ({ users, onUserUpdated: onUserDeleted }) => {
  return (
    <Paper sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <UserTableRow key={user.id} user={user} onUserUpdated={onUserDeleted} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserTable;
