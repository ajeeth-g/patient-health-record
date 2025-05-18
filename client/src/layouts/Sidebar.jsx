import { Home } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const drawerWidth = 200;
  
  const menuItems = [{ text: "Dashboard", icon: <Home />, path: "/" }];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#004d40",
          color: "#fff",
          overflow: "hidden",
        },
      }}
    >
      <Box p={3} mb={2}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="white"
          noWrap
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          PatientApp
        </Typography>
      </Box>

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.text}
              button
              component={Link}
              to={item.path}
              sx={{
                width: "100%",
                borderRadius: 2,
                bgcolor: isActive ? "#26a69a" : "transparent",
                "&:hover": {
                  bgcolor: "#00796b",
                },
                overflow: "hidden",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: "36px",
                  mr: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#004d40",
                    p: 1,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  noWrap: true,
                  sx: {
                    color: "#ffffff",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
