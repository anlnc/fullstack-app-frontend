import { Box } from "@mui/material";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AppNavigation from "./AppNavigation";

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated && <AppNavigation />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;
