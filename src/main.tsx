import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize error suppression immediately
import { errorSuppressor } from "./utils/errorHandler";

// Additional error suppression for any remaining errors
const originalConsoleLog = console.log;
console.log = function(...args) {
  const message = args.join(' ');
  if (message.includes('proto pollution') || 
      message.includes('contentScript') ||
      message.includes('injected.js') ||
      message.includes('bundle_content')) {
    return; // Suppress extension logs
  }
  originalConsoleLog.apply(console, args);
};

createRoot(document.getElementById("root")!).render(<App />);
