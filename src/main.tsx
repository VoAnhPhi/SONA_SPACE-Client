import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ChatBot from "./components/ChatBot/index.tsx";
import PopupAd from "./components/PopupAd/index.tsx";
import App from "./App.tsx";
import 'antd/dist/reset.css';

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <ChatBot />
      <App />
      <PopupAd />
    </StrictMode>
  </GoogleOAuthProvider>
);
