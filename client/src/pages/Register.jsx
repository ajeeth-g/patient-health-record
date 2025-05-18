import { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import axios from "../api/axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import validateForm from "../utils/validateForm";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const Register = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const validate = () => {
    const newErrors = validateForm(data, "register");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/auth/register", data);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    await handleRegister();
  };

  return (
    <Container maxWidth="xs">
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={6} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Create Your Account
          </Typography>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              margin="normal"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
               InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                borderRadius: 2,
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Sign Up
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
