import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Minus, Plus } from "lucide-react";

interface StepBudgetProps {
  onNext: (budget: number, people: number) => void;
}

const StepBudget = ({ onNext }: StepBudgetProps) => {
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState(1);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setBudget(val);
  };

  const formattedBudget = budget ? Number(budget).toLocaleString("pt-BR") : "";
  const canProceed = Number(budget) >= 100 && people >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-12"
    >
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-display text-foreground">
          Sua viagem começa<br />
          <span className="gradient-text">no seu bolso.</span>
        </h1>
        <p className="text-muted-foreground text-lg">Quanto você pretende investir?</p>
      </div>

      <div className="w-full flex items-baseline justify-center gap-2">
        <span className="text-3xl font-bold text-muted-foreground">R$</span>
        <input
          type="text"
          inputMode="numeric"
          value={formattedBudget}
          onChange={handleBudgetChange}
          placeholder="0"
          className="text-6xl md:text-7xl font-extrabold tracking-display bg-transparent border-none outline-none text-center text-foreground tabular-nums w-full max-w-md placeholder:text-border"
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Passageiros</span>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setPeople(Math.max(1, people - 1))}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary"
          >
            <Minus size={18} />
          </button>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-primary" />
            <span className="text-3xl font-extrabold tabular-nums text-foreground">{people}</span>
          </div>
          <button
            onClick={() => setPeople(people + 1)}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <Button
        disabled={!canProceed}
        onClick={() => onNext(Number(budget), people)}
        className="w-full max-w-xs h-14 rounded-full text-lg font-bold gradient-tropical border-0 shadow-lg"
      >
        Continuar
      </Button>
    </motion.div>
  );
};

export default StepBudget;
