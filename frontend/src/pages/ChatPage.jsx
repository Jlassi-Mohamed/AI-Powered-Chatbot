import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

import {
  sendMessage,
  getConversations,
  getMessages,
  deleteConversation,
} from "../api/chat";

function ChatPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [model, setModel] = useState("openai");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const res = await getConversations();
      setConversations(res.data);
    } catch (err) {
      console.error("Error loading conversations:", err);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      const res = await getMessages(conversationId);
      setMessages(res.data);
      setCurrentConversation(conversationId);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirmDelete") || "Delete this conversation?")) return;
    try {
      await deleteConversation(id);
      if (currentConversation === id) {
        setCurrentConversation(null);
        setMessages([]);
      }
      await loadConversations();
    } catch (err) {
      console.error("Error deleting conversation:", err);
    }
  };

  const handleSend = async () => {
    if (!query.trim()) return;
    setIsLoading(true);

    try {
      const res = await sendMessage(model, query, currentConversation, i18n.language);
      const newMessage = { role: "user", content: query };
      const botReply = { role: "assistant", content: res.data.response };

      setMessages((prev) => [...prev, newMessage, botReply]);
      setQuery("");

      if (!currentConversation) {
        setCurrentConversation(res.data.conversation_id);
        await loadConversations();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewConversation = () => {
    setCurrentConversation(null);
    setMessages([]);
  };

  return (
    <Box sx={{ display: "flex", height: "85vh", width: "100vw", pt: "64px" }}>
      {/* Sidebar */}
      <Box sx={{ width: 280, borderRight: "1px solid #ddd", bgcolor: "background.paper", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">{t("conversations")}</Typography>
          <IconButton onClick={handleNewConversation}>
            <AddIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ flex: 1, overflowY: "auto" }}>
          {conversations.map((conv) => (
            <ListItemButton
              key={conv.id}
              selected={currentConversation === conv.id}
              onClick={() => loadMessages(conv.id)}
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="body2" noWrap>
                {conv.model.toLocaleString()} • {new Date(conv.created_at).toLocaleString()}
              </Typography>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(conv.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Chat area */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: "1px solid #ddd", bgcolor: "background.paper" }}>
          <Typography variant="h6" fontWeight={600}>
            {isArabic ? `${model} ${t("chatWith")}` : `${t("chatWith")} ${model}`}
          </Typography>
          <Select value={model} onChange={(e) => setModel(e.target.value)} size="small">
            <MenuItem value="openai">OpenAI GPT-4</MenuItem>
            <MenuItem value="llama">Llama 3</MenuItem>
            <MenuItem value="deepseek">DeepSeek</MenuItem>
          </Select>
        </Box>

        {/* Messages */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#fafafa" }}>
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <Paper
                key={i}
                sx={{
                  p: 1.5,
                  mb: 1,
                  maxWidth: "75%",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%)"
                      : "grey.100",
                  color: msg.role === "user" ? "white" : "black", // make text readable
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Paper>

            ))
          ) : (
            <Box sx={{ textAlign: "center", mt: 10, color: "text.secondary" }}>
              <Typography variant="h5" gutterBottom>
                {t("welcomeMessage") || "How can I help you today?"}
              </Typography>
              <Typography variant="body2">
                {t("startChatting") || "Ask me anything and I'll do my best to assist you!"}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", p: 2, borderTop: "1px solid #ddd", bgcolor: "background.paper" }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("typeMessage") || "Type your message..."}
            disabled={isLoading}
          />
          <IconButton onClick={handleSend} disabled={!query.trim() || isLoading} sx={{ ml: 1 }}>
            {isLoading ? <CircularProgress size={20} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatPage;
