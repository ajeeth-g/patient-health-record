import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import validateForm from "../utils/validateForm";


const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validate = () => {
    const newErrors = validateForm(data, "login");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await axios.post("/api/auth/login", data);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await handleLogin();
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
            Welcome Back! Please Log In
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
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

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

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
              Login
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register" underline="hover">
              Register here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
