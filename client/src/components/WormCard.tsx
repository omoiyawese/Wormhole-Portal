import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WormCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glow?: boolean;
}

export function WormCard({ children, className, delay = 0, glow = false }: WormCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "glass-panel rounded-2xl p-6 relative overflow-hidden group transition-all duration-300",
        glow && "hover:border-primary/50 hover:shadow-[0_0_30px_-5px_hsla(270,95%,65%,0.15)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
