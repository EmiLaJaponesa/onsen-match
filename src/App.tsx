import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { trackUTMParams, trackScrollDepth, trackPageView } from "./utils/lazyAnalytics";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AdminRoute } from "./components/admin/AdminRoute";
import { useMobileOptimizations } from "./hooks/useMobileOptimizations";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Result = lazy(() => import("./pages/Result"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminOnsenImages = lazy(() => import("./pages/AdminOnsenImages"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
  </div>
);

// Optimized React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      gcTime: 1000 * 60 * 30,   // 30 minutes in garbage collection
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  useMobileOptimizations();
  
  useEffect(() => {
    let cleanupScroll: (() => void) | undefined;
    
    // Track analytics asynchronously to defer Supabase loading
    const initAnalytics = async () => {
      // Track UTM parameters on first load
      await trackUTMParams();
      
      // Track initial page view
      await trackPageView();
      
      // Set up scroll depth tracking
      cleanupScroll = await trackScrollDepth();
    };
    
    initAnalytics();
    
    return () => {
      if (cleanupScroll) {
        cleanupScroll();
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/result/:type" element={<Result />} />
                {/* Redirect legacy alkaline route to yodo */}
                <Route path="/result/alkaline" element={<Navigate to="/result/yodo" replace />} />
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/onsen-images" 
                  element={
                    <AdminRoute>
                      <AdminOnsenImages />
                    </AdminRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
