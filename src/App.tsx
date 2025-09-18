import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Index from "./pages/Index";
import SubmitProposal from "./pages/SubmitProposal";
import JoinDAO from "./pages/JoinDAO";
import Review from "./pages/Review";
import Vote from "./pages/Vote";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Cipher Grant Lab</h1>
              </div>
              <div className="flex items-center space-x-4">
                <ConnectButton />
              </div>
            </div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submit-proposal" element={<SubmitProposal />} />
          <Route path="/join-dao" element={<JoinDAO />} />
          <Route path="/review" element={<Review />} />
          <Route path="/vote" element={<Vote />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
