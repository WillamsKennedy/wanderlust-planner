import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BudgetBar from "@/components/BudgetBar";
import StepBudget from "@/components/StepBudget";
import StepGroupType from "@/components/StepGroupType";
import StepCountryState from "@/components/StepCountryState";
import StepEntertainment from "@/components/StepEntertainment";
import StepFood from "@/components/StepFood";
import StepAccommodation from "@/components/StepAccommodation";
import StepSummary from "@/components/StepSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plane } from "lucide-react";
import type { TravelState } from "@/types/travel";

const initialState: TravelState = {
  budget: 0,
  people: 1,
  groupType: "solo",
  country: "",
  state: "",
  entertainment: [],
  food: [],
  accommodation: null,
};

const Planner = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<TravelState>(initialState);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading]);

  const handleBudget = (budget: number, people: number) => {
    setData((d) => ({ ...d, budget, people, groupType: people === 1 ? "solo" : d.groupType }));
    setStep(people > 1 ? 1 : 2);
  };

  const handleGroupType = (type: "couple" | "friends") => {
    setData((d) => ({ ...d, groupType: type }));
    setStep(2);
  };

  const handleCountryState = (country: string, state: string) => {
    setData((d) => ({ ...d, country, state }));
    setStep(3);
  };

  const handleEntertainment = (entertainment: string[]) => {
    setData((d) => ({ ...d, entertainment }));
    setStep(4);
  };

  const handleFood = (food: string[]) => {
    setData((d) => ({ ...d, food }));
    setStep(5);
  };

  const handleAccommodation = (accommodation: string) => {
    setData((d) => ({ ...d, accommodation }));
    setStep(6);
  };

  const handleRestart = () => {
    setData(initialState);
    setStep(0);
  };

  const stepLabels = ["Orçamento", "Grupo", "Destino", "Lazer", "Comida", "Hotel", "Resumo"];
  const activeSteps = data.people > 1 ? stepLabels : stepLabels.filter((_, i) => i !== 1);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft size={16} /> Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Plane size={16} className="text-primary" />
            <span className="font-bold text-sm gradient-text">Viatura</span>
          </div>
          {step > 0 && data.budget > 0 && (
            <div className="hidden sm:block w-48">
              <BudgetBar total={data.budget} spent={0} />
            </div>
          )}
        </div>
      </div>

      {/* Step indicators */}
      {step > 0 && step < 6 && (
        <div className="flex justify-center gap-2 pt-6 pb-2">
          {activeSteps.map((label, i) => {
            const isActive = i <= (data.people === 1 && step > 1 ? step - 1 : step);
            return (
              <button
                key={label}
                onClick={() => {
                  if (i < (data.people === 1 && step > 1 ? step - 1 : step)) {
                    setStep(data.people === 1 && i > 0 ? i + 1 : i);
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  isActive ? "w-8 gradient-tropical" : "w-4 bg-border"
                }`}
              />
            );
          })}
        </div>
      )}

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 0 && <StepBudget key="budget" onNext={handleBudget} />}
            {step === 1 && <StepGroupType key="group" people={data.people} onNext={handleGroupType} />}
            {step === 2 && <StepCountryState key="country" onNext={handleCountryState} />}
            {step === 3 && <StepEntertainment key="entertainment" onNext={handleEntertainment} />}
            {step === 4 && <StepFood key="food" onNext={handleFood} />}
            {step === 5 && <StepAccommodation key="accommodation" budget={data.budget} onNext={handleAccommodation} />}
            {step === 6 && <StepSummary key="summary" data={data} onRestart={handleRestart} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Planner;
