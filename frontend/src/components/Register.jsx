import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "../api/auth";

export default function Register({ onRegistered }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await register(form);
      console.log("Registration success:", res.data);
      if (onRegistered) onRegistered(res.data);
    } catch (err) {
      console.error("Registration error:", err.response || err.message);
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        width: "100vw",
        bgcolor: "#f5f5f5",
        p:1,
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
          {t("register")}
        </Typography>

        {error && (
          <Typography color="error" mb={2} align="center">
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t("firstName")}
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label={t("lastName")}
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label={t("username")}
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label={t("email")}
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label={t("password")}
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
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
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : t("send")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
