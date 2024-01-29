import AddIcon from "@mui/icons-material/Add";
import { Box, Container, Fab } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CreateUserModal from "../components/user/CreateUserModal";
import UserTable from "../components/user/UserTable";
import { useListUsers } from "../hooks/UserHooks";
import { UserModel } from "../models/UserModel";

const UserPage: React.FC = () => {
  const { listUsers } = useListUsers();
  const [users, setUsers] = React.useState<UserModel[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await listUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleUserUpdate = useCallback(async () => {
    const users = await listUsers();
    setUsers(users);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleUserCreated = useCallback(async () => {
    const users = await listUsers();
    setUsers(users);
    setIsModalOpen(false);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ margin: 0 }}>
      <UserTable users={users} onUserUpdated={handleUserUpdate} />
      <Box sx={{ position: "fixed", bottom: "2em", right: "2em" }}>
        <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
          <AddIcon />
        </Fab>
      </Box>

      <CreateUserModal isOpen={isModalOpen} onClose={handleCloseModal} onOK={handleUserCreated} />
    </Container>
  );
};

export default UserPage;
