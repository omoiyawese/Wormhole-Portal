import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Trophy, RefreshCw, Share2 } from "lucide-react";
import { useSubmitQuiz } from "@/hooks/use-stats";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  { id: 1, q: "Which EIP introduces Private Proof-of-Burn?", a: ["EIP-1559", "EIP-4844", "EIP-7503", "EIP-20"], correct: 2 },
  { id: 2, q: "What is the slogan of WORM?", a: ["Privacy is Normal", "Burn to Earn", "Code is Law", "Future is WORM"], correct: 0 },
  { id: 3, q: "What is the total supply of WORM?", a: ["1 Billion", "21 Million", "Infinite", "10,000"], correct: 1 },
  { id: 4, q: "How do you acquire WORM?", a: ["Mining", "Staking", "Private Proof of Burn", "Buying from Foundation"], correct: 2 },
  { id: 5, q: "What technology enables the privacy features?", a: ["Optimistic Rollups", "zk-SNARKs", "Sidechains", "Sharding"], correct: 1 },
  { id: 6, q: "What happens to the ETH used to mint WORM?", a: ["Locked in contract", "Sent to dev wallet", "Burned forever", "Donated to charity"], correct: 2 },
  { id: 7, q: "Who proposed EIP-7503?", a: ["Vitalik Buterin", "Nobitex Labs", "Ethereum Foundation", "ConsenSys"], correct: 1 },
  { id: 8, q: "How many free-mint NFTs are there?", a: ["10,000", "5,555", "7,503", "21,000"], correct: 2 },
  { id: 9, q: "What does 'Plausible Deniability' mean in this context?", a: ["Hiding your IP", "Burning looks like a mistake", "Using a mixer", "Encrypting metadata"], correct: 1 },
  { id: 10, q: "How often does the WORM halving occur?", a: ["Every year", "2 Years", "4 Years", "Never"], correct: 2 },
];

export function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const { mutate: submitScore } = useSubmitQuiz();

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    const currentQ = QUESTIONS[currentIndex];
    const correct = answerIndex === currentQ.correct;
    
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    // Auto advance after delay
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  useEffect(() => {
    if (showResult) {
      submitScore(score);
      if (score === QUESTIONS.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#06b6d4', '#ffffff']
        });
      }
    }
  }, [showResult]);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleTwitterShare = () => {
    const text = `I just scored ${score}/10 on the @EIP7503 Mastery Quiz! 🪱\n\nAre you ready for the WORMhole?\n\n#WORM #PrivacyIsNormal #EIP7503`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <Trophy className={cn("w-32 h-32 relative z-10", score === 10 ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "text-muted-foreground")} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-display font-bold">
            {score === 10 ? "PERFECT SCORE!" : "Quiz Complete"}
          </h2>
          <p className="text-xl text-muted-foreground">
            You scored <span className="text-primary font-bold">{score}</span> out of {QUESTIONS.length}
          </p>
        </div>

        {score === 10 && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 rounded-xl p-6 backdrop-blur-md"
          >
            <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
              WORM CHAD CERTIFIED
            </h3>
            <p className="text-sm text-muted-foreground">You understand the future of privacy.</p>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button 
            onClick={handleTwitterShare}
            className="flex-1 bg-[#1DA1F2] hover:bg-[#1a91da] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#1DA1F2]/20"
          >
            <Share2 className="w-5 h-5" />
            Verify on Twitter
          </button>
          
          <button 
            onClick={resetQuiz}
            className="flex-1 bg-card hover:bg-muted border border-white/10 text-foreground py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest font-mono">
          <span>Question {currentIndex + 1} / {QUESTIONS.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="py-8 min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">
              {currentQ.q}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.a.map((answer, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrectAnswer = idx === currentQ.correct;
                const showStatus = selectedAnswer !== null;
                
                let buttonStyle = "bg-card/50 hover:bg-card border-white/10 hover:border-primary/50 text-muted-foreground hover:text-foreground";
                
                if (showStatus) {
                  if (isSelected && isCorrectAnswer) {
                    buttonStyle = "bg-green-500/20 border-green-500 text-green-200";
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonStyle = "bg-red-500/20 border-red-500 text-red-200";
                  } else if (isCorrectAnswer) {
                    buttonStyle = "bg-green-500/10 border-green-500/50 text-green-200/50";
                  } else {
                    buttonStyle = "opacity-50 grayscale";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedAnswer !== null}
                    className={cn(
                      "p-6 rounded-xl border text-left font-medium transition-all duration-200 flex items-center justify-between group relative overflow-hidden",
                      buttonStyle
                    )}
                  >
                    <span className="relative z-10">{answer}</span>
                    {isSelected && isCorrectAnswer && <Check className="w-5 h-5 text-green-400 relative z-10" />}
                    {isSelected && !isCorrectAnswer && <X className="w-5 h-5 text-red-400 relative z-10" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
