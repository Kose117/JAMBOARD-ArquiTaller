import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import AppInitializer from "./AppInitializer.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppInitializer />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
