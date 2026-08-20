import { createRoot } from "react-dom/client"

import "@fontsource-variable/plus-jakarta-sans/wght.css"
import "./index.css"
import AppV41 from "./v41/AppV41.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import VisualEngineV27 from "@/visual-v27/VisualEngineV27.tsx"
import { initNative } from "@/capacitor/native-init"

// Inicialización nativa (no-op en navegador web, activo en Android/iOS).
initNative().catch(console.error)

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AppV41 />
    <VisualEngineV27 />
  </ThemeProvider>,
)

