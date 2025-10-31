import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/mobile-optimizations.css";
import { reportWebVitals } from "./utils/webVitals";

createRoot(document.getElementById("root")!).render(<App />);

// Start monitoring Web Vitals for performance tracking
reportWebVitals();
