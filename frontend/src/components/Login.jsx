import { useState } from "react";
import { useTranslation } from "react-i18next";
import { login } from "../api/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function Login({ onLoggedIn }) {
  const { t} = useTranslation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      onLoggedIn(res.data.access);
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",    
        minHeight: "80vh",
        width: "100vw",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h5" mb={3} align="center">
          {t("login")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t("username")}
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
            type="text"
            required
          />
          <TextField
            fullWidth
            label={t("password")}
            name="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            type="password"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            {t("login")}
          </Button>
        </form>
        {error && (
          <Typography color="error" mt={2} align="center">
            {JSON.stringify(error)}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
