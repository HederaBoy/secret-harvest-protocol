import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { WalletProvider } from "./providers/WalletProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { errorSuppressor } from "./utils/errorHandler";
import Index from "./pages/Index";
import Farms from "./pages/Farms";
import Rewards from "./pages/Rewards";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import "./App.css";

// Initialize error suppression for external extensions
errorSuppressor;

const App = () => (
  <ErrorBoundary>
    <WalletProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/farms" element={<Farms />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </WalletProvider>
  </ErrorBoundary>
);

export default App;
