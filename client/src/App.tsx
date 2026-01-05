import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Education from "@/pages/Education";
import Mastery from "@/pages/Mastery";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/">
          <Education />
        </Route>
        <Route path="/quiz">
          <Mastery />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen text-foreground font-sans selection:bg-primary/20">
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-50 mix-blend-overlay"></div>
        
        <main className="container mx-auto px-4 min-h-screen relative z-10">
          <Router />
        </main>
        
        <Navigation />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
