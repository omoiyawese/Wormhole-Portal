import { motion } from "framer-motion";
import { Quiz } from "@/components/Quiz";
import { useStats } from "@/hooks/use-stats";
import { Award, Target, Zap } from "lucide-react";

export default function Mastery() {
  const { data: stats } = useStats();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-12 pb-24 pt-12"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary">
          WORM Mastery
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge. Earn your stripes. Join the hive mind.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-card/50 border border-white/5 rounded-2xl p-6 text-center">
          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
            <Target className="w-4 h-4" />
            Quizzes Taken
          </div>
          <div className="text-3xl font-mono font-bold text-white">
            {stats?.totalQuizzesTaken.toLocaleString() || "0"}
          </div>
        </div>

        <div className="bg-card/50 border border-white/5 rounded-2xl p-6 text-center">
          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Perfect Scores
          </div>
          <div className="text-3xl font-mono font-bold text-primary text-glow">
            {stats?.perfectScores.toLocaleString() || "0"}
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-1 bg-card/50 border border-white/5 rounded-2xl p-6 text-center">
          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-orange-400" />
            Global ETH Burned
          </div>
          <div className="text-3xl font-mono font-bold text-orange-400 text-glow">
            {stats?.totalEthBurned.toFixed(2) || "0.00"}
          </div>
        </div>
      </div>

      <div className="bg-card/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <Quiz />
      </div>
    </motion.div>
  );
}
