import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown, Search, TrendingUp } from "lucide-react";
import { allCountries, demandColors, type CountryData } from "@/data/countries";
import type { StateRecommendation } from "@/types/travel";

interface StepCountryStateProps {
  onNext: (country: string, state: string) => void;
}

const currentMonth = new Date().toLocaleString("pt-BR", { month: "long" });

// Mock states — will be replaced by n8n webhook
const mockStates: Record<string, StateRecommendation[]> = {
  BR: [
    { id: "BA", name: "Bahia", country: "BR", seasonLabel: "Clima ameno", seasonType: "moderate", description: "Praias tranquilas e cultura vibrante.", avgCostPerPerson: 2500 },
    { id: "SC", name: "Santa Catarina", country: "BR", seasonLabel: "Baixa temporada", seasonType: "low", description: "Preços acessíveis e trilhas incríveis.", avgCostPerPerson: 1800 },
    { id: "RJ", name: "Rio de Janeiro", country: "BR", seasonLabel: "Clima seco", seasonType: "moderate", description: "Cultura, gastronomia e paisagens icônicas.", avgCostPerPerson: 3200 },
    { id: "CE", name: "Ceará", country: "BR", seasonLabel: "Alta temporada", seasonType: "high", description: "Sol constante e kitesurf.", avgCostPerPerson: 2200 },
  ],
  PT: [
    { id: "LIS", name: "Lisboa", country: "PT", seasonLabel: "Primavera", seasonType: "moderate", description: "Clima agradável e menos turistas.", avgCostPerPerson: 4500 },
    { id: "ALG", name: "Algarve", country: "PT", seasonLabel: "Pré-verão", seasonType: "low", description: "Praias douradas com preços baixos.", avgCostPerPerson: 3800 },
  ],
  AR: [
    { id: "BAS", name: "Buenos Aires", country: "AR", seasonLabel: "Outono", seasonType: "moderate", description: "Tango, carne e cultura.", avgCostPerPerson: 2000 },
    { id: "MZA", name: "Mendoza", country: "AR", seasonLabel: "Vinícola", seasonType: "low", description: "Vinhedos e paisagens andinas.", avgCostPerPerson: 1800 },
  ],
  US: [
    { id: "FL", name: "Flórida", country: "US", seasonLabel: "Primavera", seasonType: "high", description: "Parques temáticos e praias.", avgCostPerPerson: 5000 },
    { id: "NY", name: "Nova York", country: "US", seasonLabel: "Clima ameno", seasonType: "moderate", description: "A cidade que nunca dorme.", avgCostPerPerson: 6000 },
  ],
  FR: [
    { id: "PAR", name: "Paris", country: "FR", seasonLabel: "Primavera", seasonType: "high", description: "A cidade luz na melhor época.", avgCostPerPerson: 5500 },
  ],
  IT: [
    { id: "ROM", name: "Roma", country: "IT", seasonLabel: "Primavera", seasonType: "moderate", description: "História milenar e gastronomia.", avgCostPerPerson: 4800 },
  ],
  JP: [
    { id: "TKY", name: "Tóquio", country: "JP", seasonLabel: "Cerejeiras", seasonType: "high", description: "Tradição e tecnologia.", avgCostPerPerson: 7000 },
  ],
  MX: [
    { id: "QR", name: "Cancún", country: "MX", seasonLabel: "Seco", seasonType: "low", description: "Riviera Maya e ruínas maias.", avgCostPerPerson: 2800 },
  ],
  ES: [
    { id: "BCN", name: "Barcelona", country: "ES", seasonLabel: "Primavera", seasonType: "moderate", description: "Gaudí, tapas e mar.", avgCostPerPerson: 4200 },
  ],
  CO: [
    { id: "BOG", name: "Bogotá", country: "CO", seasonLabel: "Seco", seasonType: "low", description: "Arte, história e café.", avgCostPerPerson: 1500 },
  ],
};

const seasonColors: Record<string, string> = {
  high: "text-destructive",
  moderate: "text-primary",
  low: "text-secondary",
};

const StepCountryState = ({ onNext }: StepCountryStateProps) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = allCountries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const states = selectedCountry ? mockStates[selectedCountry] || [] : [];
  const selectedCountryData = allCountries.find((c) => c.id === selectedCountry);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-display text-foreground">
          Para onde vamos?
        </h2>
        <p className="text-muted-foreground text-lg">
          Todos os países disponíveis · <span className="font-semibold capitalize">{currentMonth}</span>
        </p>
      </div>

      {/* Country selector */}
      <div className="w-full max-w-md">
        <button
          onClick={() => setShowCountrySelect(!showCountrySelect)}
          className="w-full flex items-center justify-between p-4 rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-primary" />
            {selectedCountryData ? (
              <span className="font-semibold text-foreground flex items-center gap-2">
                {selectedCountryData.flag} {selectedCountryData.name}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${demandColors[selectedCountryData.demand]}`}>
                  {selectedCountryData.demandLabel}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Selecione um país</span>
            )}
          </div>
          <ChevronDown size={18} className={`text-muted-foreground transition-transform ${showCountrySelect ? 'rotate-180' : ''}`} />
        </button>

        {showCountrySelect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 rounded-2xl border border-border bg-card overflow-hidden"
            style={{ boxShadow: 'var(--card-shadow)' }}
          >
            <div className="p-3 border-b border-border">
              <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-xl">
                <Search size={16} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar país..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-sm text-foreground w-full placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCountry(c.id);
                    setShowCountrySelect(false);
                    setSearch("");
                  }}
                  className="w-full text-left px-5 py-3 hover:bg-primary/5 transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-3 text-foreground font-medium">
                    <span className="text-lg">{c.flag}</span>
                    {c.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={12} className={c.demand === 'high' ? 'text-destructive' : c.demand === 'moderate' ? 'text-primary' : 'text-secondary'} />
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${demandColors[c.demand]}`}>
                      {c.demandLabel}
                    </span>
                  </div>
                </button>
              ))}
              {filteredCountries.length === 0 && (
                <p className="text-center py-4 text-sm text-muted-foreground">Nenhum país encontrado</p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* State cards */}
      {states.length > 0 && (
        <div className="w-full space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
            Destinos em {selectedCountryData?.name}
          </span>
          <div className="grid gap-3">
            {states.map((state, i) => (
              <motion.button
                key={state.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNext(selectedCountry, state.id)}
                className="p-6 rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-lg"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <span className={`text-xs font-bold tracking-widest uppercase ${seasonColors[state.seasonType]}`}>
                  {state.seasonLabel}
                </span>
                <h3 className="text-2xl font-bold mt-1 text-card-foreground">{state.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{state.description}</p>
                <p className="text-xs text-muted-foreground mt-3 tabular-nums">
                  Média: R$ {state.avgCostPerPerson.toLocaleString("pt-BR")} /pessoa
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {selectedCountry && states.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Destinos para {selectedCountryData?.name} serão carregados via n8n.</p>
        </div>
      )}
    </motion.div>
  );
};

export default StepCountryState;
