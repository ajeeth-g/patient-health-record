import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: 200,
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 200,
            boxSizing: "border-box",
          },
        }}
      >
        <Sidebar />
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, minHeight: "100vh", backgroundColor: "#f1fdfb" }}
      >
        <Header onToggleSidebar={handleDrawerToggle} isMobile={isMobile} />
        <Box p={isMobile ? 2 : 3}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
