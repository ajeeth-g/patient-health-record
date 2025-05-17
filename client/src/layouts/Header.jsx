import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onToggleSidebar, isMobile }) => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "#004d40",
      }}
    >
      <Toolbar sx={{ px: isMobile ? 2 : 4 }}>
        {isMobile && (
          <IconButton
            onClick={onToggleSidebar}
            edge="start"
            sx={{ mr: 2, color: "#ffffff" }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box flexGrow={1}>
          <Typography
            variant="h6"
            sx={{
              color: "#ffffff",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            PatientApp
          </Typography>
        </Box>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{
            backgroundColor: "#ff7043",
            color: "#ffffff",
            textTransform: "none",
            fontWeight: 600,
            px: 2.5,
            "&:hover": {
              backgroundColor: "#f4511e",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
