import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      register: "Register",
      login: "Login",
      logout: "Logout",
      email: "Email",
      username: "Username",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
      send: "Send",
      message: "Your message",
      response: "Response",
      switchLanguage: "Switch Language",
      donthaveaccount: "Don't have an account ?",
      haveaccount: "Already have an account ?",
      about: 'About',
      chat: 'Chat',
      profile: 'Profile',
      language: 'Language',
      settings: 'Settings',
      chatWith: 'Chat with',
      welcomeMessage: 'Hi, How can I help you today ?',
      startChatting: 'Start chatting',
      typeMessage: 'Ask anything',
      confirmDelete: 'Are you sure ?',
      conversations: 'Latest conversations',
      aboutTitle: "About This Project",
      aboutDescription: "Welcome to our AI-powered chat application! This project demonstrates a modern chat system with multiple AI models, multilingual support, and conversation management.",
      keyFeatures: "Key Features",
      featureChat: "Chat with multiple AI models like OpenAI GPT-4, LLaMA 3, and DeepSeek.",
      featureHistory: "Save and manage chat conversations, continue them anytime.",
      featureProfile: "View your user profile and account details.",
      featureLanguage: "Supports multiple languages, including English and Arabic.",
      techStack: "This project is built with React, MUI, Django REST Framework, and integrates multiple AI models for a seamless chat experience.",
      noInterests: "No interests yet.",
      interests: "Interests"
    }
  },
  ar: {
    translation: {
      register: "تسجيل",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      email: "البريد الإلكتروني",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      firstName: "الاسم",
      lastName: "اللقب",
      send: "إرسال",
      message: "رسالتك",
      response: "الرد",
      switchLanguage: "تغيير اللغة",
      donthaveaccount: "ليس لديك حساب ؟",
      haveaccount: "لديك حساب ؟",
      about : 'نبذة عنا',
      chat: 'محادثة',
      profile: 'الملف الشخصي',
      language: 'اللغة',
      settings: 'الاعدادات',
      chatWith: 'تحدث مع',
      welcomeMessage: 'مرحبا كيف يمكنني مساعدتك اليوم ؟',
      startChatting: 'ابدأ المحادثة',
      typeMessage: 'اسأل عن أي شيء',
      confirmDelete: 'هل أنت متأكد ؟ لا يمكنك استرجاع المحادثة',
      conversations: 'المحادثات السابقة',
      aboutTitle: "عن المشروع",
      aboutDescription: "مرحبًا بك في تطبيق الدردشة المدعوم بالذكاء الاصطناعي! يعرض هذا المشروع نظام دردشة حديث مع نماذج ذكاء اصطناعي متعددة ودعم متعدد اللغات وإدارة المحادثات.",
      keyFeatures: "الميزات الرئيسية",
      featureChat: "الدردشة مع نماذج ذكاء اصطناعي متعددة مثل OpenAI GPT-4 و LLaMA 3 و DeepSeek.",
      featureHistory: "حفظ وإدارة المحادثات واستمرارها في أي وقت.",
      featureProfile: "عرض معلومات ملفك الشخصي وحسابك.",
      featureLanguage: "يدعم لغات متعددة، بما في ذلك الإنجليزية والعربية.",
      techStack: "تم بناء هذا المشروع باستخدام React و MUI و Django REST Framework ويجمع بين نماذج ذكاء اصطناعي متعددة لتجربة دردشة سلسة.",
      noInterests: "لا توجد اهتمامات مسجلة حتى الان",
      interests: "الاهتمامات"

    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar", 
  interpolation: { escapeValue: false }
});

export default i18n;
