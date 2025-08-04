import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PopupAd from "./components/PopupAd/index.tsx";
import ChatBot from "./components/ChatBot/index.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <App />
      <PopupAd />
      <ChatBot />
    </StrictMode>
  </GoogleOAuthProvider>
);
