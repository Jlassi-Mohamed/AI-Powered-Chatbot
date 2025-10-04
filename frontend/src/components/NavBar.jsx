import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Avatar,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Select,
  FormControl,
  InputLabel,
  Badge
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { logout as apiLogout } from "../api/auth";
import { useTranslation } from "react-i18next";

export default function ModernNavBar({ onLogout }) {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
//   const [language, setLanguage] = useState("en");
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  const menuItems = [
    { to: "/chat", label: t("chat"), icon: <ChatIcon />, badge: 3 },
    { to: "/profile", label: t("profile"), icon: <PersonIcon /> },
    { to: "/about", label: t("about"), icon: <InfoIcon /> },
  ];

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.warn(e);
    }
    localStorage.removeItem("access_token");
    if (onLogout) onLogout("");
    setProfileAnchor(null);
    navigate("/");
  };

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const isActivePath = (path) => location.pathname === path;

  const renderMobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileDrawer}
      onClose={() => setMobileDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          background: "linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%)", 
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img
          src="../assets/logo.png"
          alt="Logo"
          style={{ height: 40, cursor: "pointer" }}
          onClick={() => {
            navigate("/chat");
            setMobileDrawer(false);
          }}
        />
        <IconButton onClick={() => setMobileDrawer(false)} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.to}
            onClick={() => {
              navigate(item.to);
              setMobileDrawer(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              backgroundColor: isActivePath(item.to) ? "rgba(255,255,255,0.15)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontWeight: isActivePath(item.to) ? 600 : 400 }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />
        <ListItem
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Drawer>
  );

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        background: "white",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => setMobileDrawer(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <img
            src="/logo.png"
            alt="logo"
            style={{ height: 40, cursor:'pointer'}}
            onClick={() => navigate("/chat")}
          />

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, ml: 2 }}>
            {menuItems.map((item) => (
              <Chip
                key={item.to}
                icon={item.icon}
                label={item.label}
                onClick={() => navigate(item.to)}
                variant={isActivePath(item.to) ? "filled" : "outlined"}
                color={isActivePath(item.to) ? "primary" : "default"}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  ...(isActivePath(item.to) && {
                    background: "linear-gradient(45deg, #2e7d32, #4caf50)", // Changed to green gradient
                    color: "white",
                  }),
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControl sx={{ minWidth: 120, display: { xs: "none", sm: "block" } }}>
            <InputLabel id="language-select-label">{t("language")}</InputLabel>
            <Select
              labelId="language-select-label"
              value={i18n.language}
              label="Language"
              onChange={handleLanguageChange}
              size="small"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">العربية</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {localStorage.getItem("username") || "User"}
              </Typography>
            </Box>

            <IconButton
              onClick={(e) => setProfileAnchor(e.currentTarget)}
              sx={{ p: 0.25 }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(45deg, #2e7d32, #4caf50)", // Changed to green gradient
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                {localStorage.getItem("username")?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </IconButton>
          </Box>
        </Box>

        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            },
          }}
        >
          <MenuItem onClick={() => { navigate("/profile"); setProfileAnchor(null); }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            {t('profile')}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            {t('logout')}
          </MenuItem>
        </Menu>

        {renderMobileDrawer()}
      </Toolbar>
    </AppBar>
  );
}