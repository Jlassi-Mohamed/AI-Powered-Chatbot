import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ChatPage from "./pages/ChatPage";
import { useTranslation } from "react-i18next";
import MuiNavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");
  const [showLogin, setShowLogin] = useState(true);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  if (!token) {
    return (
      <div>
        {showLogin ? <Login onLoggedIn={setToken} /> : <Register onRegistered={() => setShowLogin(true)} />}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "1px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {showLogin ? (
            <>
              <button onClick={() => setShowLogin(false)}>{t("register")}</button>
              <span>{t("donthaveaccount")}</span>
            </>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)}>{t("login")}</button>
              <span>{t("haveaccount")}</span>
            </>
          )}

          <select value={lang} onChange={handleLanguageChange} style={{ marginLeft: 10 }}>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <MuiNavBar onLogout={setToken} />
      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
