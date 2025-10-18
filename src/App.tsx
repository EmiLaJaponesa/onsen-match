import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import { trackUTMParams, trackScrollDepth, trackPageView } from "./utils/analytics";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Track UTM parameters on first load
    trackUTMParams();
    
    // Track initial page view
    trackPageView();
    
    // Set up scroll depth tracking
    const cleanupScroll = trackScrollDepth();
    
    return () => {
      cleanupScroll();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result/:type" element={<Result />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
