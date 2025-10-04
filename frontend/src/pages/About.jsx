import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import LanguageIcon from "@mui/icons-material/Language";
import HistoryIcon from "@mui/icons-material/History";
import { useTranslation } from "react-i18next";

function About() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <Box sx={{ p: 9, display: "flex", justifyContent: "center", direction: isArabic ? "rtl" : "ltr" }}>
      <Paper sx={{ p: 5, maxWidth: 600, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          {t("aboutTitle") || "About This Project"}
        </Typography>
        <Typography variant="body1" paragraph>
          {t("aboutDescription") ||
            "Welcome to our AI-powered chat application! This project demonstrates a modern chat system with multiple AI models, multilingual support, and conversation management."}
        </Typography>

        <Typography variant="h6" gutterBottom>
          {t("keyFeatures") || "Key Features"}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={t("featureChat") || "Chat with multiple AI models like OpenAI GPT-4, LLaMA 3, and DeepSeek."} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={t("featureHistory") || "Save and manage chat conversations, continue them anytime."} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={t("featureProfile") || "View your user profile and account details."} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={t("featureLanguage") || "Supports multiple languages, including English and Arabic."} />
          </ListItem>
        </List>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t("techStack") || "This project is built with React, MUI, Django REST Framework, and integrates multiple AI models for a seamless chat experience."}
        </Typography>
      </Paper>
    </Box>
  );
}

export default About;
