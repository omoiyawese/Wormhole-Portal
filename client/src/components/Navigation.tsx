import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { BookOpen, BrainCircuit } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-2 py-2 rounded-full flex items-center gap-1 shadow-2xl shadow-black/50">
      <Link href="/">
        <button className={cn(
          "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2",
          location === "/" 
            ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsla(270,95%,65%,0.5)]" 
            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
        )}>
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Education</span>
        </button>
      </Link>
      
      <Link href="/quiz">
        <button className={cn(
          "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2",
          location === "/quiz" 
            ? "bg-secondary text-secondary-foreground shadow-[0_0_20px_-5px_hsla(190,90%,50%,0.5)]" 
            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
        )}>
          <BrainCircuit className="w-4 h-4" />
          <span className="hidden sm:inline">Mastery Quiz</span>
        </button>
      </Link>
    </nav>
  );
}
