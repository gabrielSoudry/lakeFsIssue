import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MuiCustomThemeProvider } from "./contexts/CustomThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MuiCustomThemeProvider>
      <App />
    </MuiCustomThemeProvider>
  </StrictMode>
);
