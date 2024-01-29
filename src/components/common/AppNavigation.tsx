import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List component="nav" style={{ width: "200px" }}>
      <ListItemButton onClick={() => navigate("/")} selected={location.pathname === "/"}>
        <ListItemIcon>
          <FeedIcon />
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/users")} selected={location.pathname === "/users"}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </List>
  );
};

export default AppNavigation;
