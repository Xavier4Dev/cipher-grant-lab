import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/submit-proposal" element={<SubmitProposal />} />
        <Route path="/join-dao" element={<JoinDAO />} />
        <Route path="/review" element={<Review />} />
        <Route path="/vote" element={<Vote />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
