import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import validateForm from "../utils/validateForm";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
              type="password"
              label="Password"
              margin="normal"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
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
              sx={{ mt: 2, borderRadius: 2 }}
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
