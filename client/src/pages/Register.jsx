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

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/auth/register", data);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // Redirect to Dashboard or protected route after register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
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
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={handleRegister}
          >
            Sign Up
          </Button>

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
