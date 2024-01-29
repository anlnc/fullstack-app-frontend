import { Box } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppNavigation from "./AppNavigation";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("token");
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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
