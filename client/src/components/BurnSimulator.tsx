import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight, Coins } from "lucide-react";
import { useBurnSimulator } from "@/hooks/use-stats";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

export function BurnSimulator() {
  const [amount, setAmount] = useState(0);
  const [isBurning, setIsBurning] = useState(false);
  const { mutate: burn, isPending } = useBurnSimulator();
  const { toast } = useToast();

  const handleBurn = () => {
    if (amount <= 0) return;
    setIsBurning(true);
    
    // Artificial delay for the "burning" animation effect
    setTimeout(() => {
      // Simulate success for the demo
      toast({
        title: "Proof of Burn Generated",
        description: `Successfully simulated burning ${amount} ETH for WORM.`,
      });
      setIsBurning(false);
      setAmount(0);

      // We still call the backend to update global stats, 
      // but we don't block the UI on it or show an error if it fails
      burn(amount, {
        onError: (err) => {
          console.error("Backend stat update failed:", err);
        }
      });
    }, 1500);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-1">Burn Simulator</h3>
          <p className="text-sm text-muted-foreground">Slide to select ETH amount to burn</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-mono font-bold text-primary text-glow">
            {amount.toFixed(1)} ETH
          </div>
          <div className="text-xs text-secondary font-mono">
            ≈ {(amount * 1000).toLocaleString()} WORM
          </div>
        </div>
      </div>

      <div className="relative py-4">
        <Slider
          defaultValue={[0]}
          max={100}
          step={0.1}
          value={[amount]}
          onValueChange={(vals) => setAmount(vals[0])}
          disabled={isBurning}
          className="cursor-pointer"
        />
        
        {/* Visual indicators on slider track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-transparent pointer-events-none flex justify-between px-1">
          {[0, 25, 50, 75, 100].map((tick) => (
            <div key={tick} className="w-0.5 h-3 bg-white/10 mt-[-4px]" />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 py-8 relative min-h-[160px]">
        {/* Source: ETH */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 relative overflow-hidden">
            <Coins className="w-8 h-8 text-slate-400" />
            <AnimatePresence>
              {isBurning && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-orange-500/20"
                />
              )}
            </AnimatePresence>
          </div>
          <span className="font-mono text-sm text-muted-foreground">ETH</span>
        </div>

        {/* The Burn Process */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="h-1 w-full bg-white/5 absolute top-1/2 -translate-y-1/2" />
          
          <AnimatePresence mode="wait">
            {isBurning ? (
              <motion.div
                key="burning"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative z-10"
              >
                <div className="absolute inset-0 bg-orange-500 blur-xl opacity-40 animate-pulse" />
                <Flame className="w-12 h-12 text-orange-500 animate-bounce" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-card p-2 rounded-full border border-white/10 z-10"
              >
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particles when burning */}
          {isBurning && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-0 w-2 h-0.5 bg-orange-400"
                  initial={{ x: 0, opacity: 1, y: 0 }}
                  animate={{ 
                    x: "100%", 
                    opacity: 0,
                    y: (Math.random() - 0.5) * 40 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "linear" 
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Destination: WORM */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_hsla(270,95%,65%,0.2)]">
            <span className="text-2xl font-display font-bold text-primary">W</span>
          </div>
          <span className="font-mono text-sm text-primary">WORM</span>
        </div>
      </div>

      <button
        onClick={handleBurn}
        disabled={isBurning || amount <= 0}
        className="w-full py-4 rounded-xl font-display font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-[length:200%_100%] hover:bg-[100%_0] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-900/20 hover:shadow-orange-600/30 flex items-center justify-center gap-2 group"
      >
        {isBurning ? (
          <>Performing zk-SNARK Ceremony...</>
        ) : (
          <>
            <Flame className="w-5 h-5 group-hover:animate-pulse" />
            BURN IT ALL
          </>
        )}
      </button>
      
      <p className="text-xs text-center text-muted-foreground mt-4">
        * This is a simulation. No real ETH is burned on mainnet.
      </p>
    </div>
  );
}
