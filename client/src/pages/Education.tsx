import { motion } from "framer-motion";
import { WormCard } from "@/components/WormCard";
import { BurnSimulator } from "@/components/BurnSimulator";
import { Shield, Lock, TrendingUp, Flame } from "lucide-react";

export default function Education() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-12 pb-24"
    >
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block relative"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full" />
          <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 relative z-10">
            EIP-7503
          </h1>
        </motion.div>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
          Zero-Knowledge Wormholes <br/>
          <span className="text-primary font-medium">Burn ETH</span> to mint <span className="text-secondary font-medium">Privacy</span>
        </p>
      </section>

      {/* Simulator Section */}
      <WormCard glow className="bg-gradient-to-br from-card to-card/50 border-primary/20">
        <BurnSimulator />
      </WormCard>

      {/* Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WormCard delay={0.2} className="h-full">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Private Proof of Burn</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Users burn ETH on L1, generating a ZK proof. This proof allows them to mint WORM tokens on a new address with zero link to the source.
          </p>
        </WormCard>

        <WormCard delay={0.3} className="h-full">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Plausible Deniability</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            From the outside, burning ETH looks like a mistake. Observers can't distinguish between accidental burns and intentional privacy deposits.
          </p>
        </WormCard>

        <WormCard delay={0.4} className="h-full">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Deflationary Spiral</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Every mint permanently removes ETH from circulation. EIP-7503 transforms Ethereum into a black hole for supply.
          </p>
        </WormCard>
      </div>

      {/* Deep Dive */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold border-l-4 border-primary pl-4">
          How It Works
        </h2>
        <div className="space-y-4 text-muted-foreground leading-loose">
          <p>
            Traditional privacy solutions like Tornado Cash rely on mixing pools, which can be blacklisted. 
            <strong className="text-foreground"> EIP-7503 represents a paradigm shift.</strong>
          </p>
          <p>
            Instead of mixing, you perform a "unilateral burn". You send ETH to an unspendable address (like 0x00...00). 
            This action generates a Merkle inclusion proof. Using <strong className="text-foreground">zk-SNARKs</strong>, 
            you can prove you burned ETH without revealing WHICH burn transaction was yours.
          </p>
          <p>
            This allows you to mint a proportional amount of WORM tokens on a completely fresh wallet. 
            The link between the sender (ETH burner) and the receiver (WORM minter) is mathematically severed.
          </p>
        </div>
      </section>
    </motion.div>
  );
}
