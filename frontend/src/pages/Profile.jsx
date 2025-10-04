import { useState, useEffect } from "react";
import { Box, Typography, TextField, CircularProgress, Paper, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getUserInfo, getUserInterests } from "../api/auth"; 

function Profile() {
  const { t } = useTranslation();

  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getUserInfo();
        setUser(res.data);

        const interestRes = await getUserInterests();
        setInterests(interestRes.data.interests);
        console.log(interests); 
      } catch (err) {
        console.error("Error fetching user info or interests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          {t("profile") || "Profile"}
        </Typography>

        <TextField
          fullWidth
          label={t("username") || "Username"}
          value={user.username}
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          label={t("email") || "Email"}
          value={user.email}
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          label={t("firstName") || "First Name"}
          value={user.first_name}
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          label={t("lastName") || "Last Name"}
          value={user.last_name}
          margin="normal"
          InputProps={{ readOnly: true }}
        />

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            {t("interests")}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {interests.length ? (
              interests.map((tag, idx) => (
                <Chip
                  key={idx}
                  label={tag}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t("noInterests")}
              </Typography>
            )}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default Profile;
