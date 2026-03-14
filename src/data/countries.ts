export interface CountryData {
  id: string;
  name: string;
  flag: string;
  demand: 'high' | 'moderate' | 'low';
  demandLabel: string;
}

export const allCountries: CountryData[] = [
  { id: 'BR', name: 'Brasil', flag: '🇧🇷', demand: 'high', demandLabel: 'Alta procura' },
  { id: 'PT', name: 'Portugal', flag: '🇵🇹', demand: 'high', demandLabel: 'Alta procura' },
  { id: 'AR', name: 'Argentina', flag: '🇦🇷', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'CO', name: 'Colômbia', flag: '🇨🇴', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'MX', name: 'México', flag: '🇲🇽', demand: 'high', demandLabel: 'Alta procura' },
  { id: 'US', name: 'Estados Unidos', flag: '🇺🇸', demand: 'high', demandLabel: 'Alta procura' },
  { id: 'ES', name: 'Espanha', flag: '🇪🇸', demand: 'high', demandLabel: 'Alta procura' },
  { id: 'FR', name: 'França', flag: '🇫🇷', demand: 'high', demandLabel: 'Alta procura' },
  { id: 'IT', name: 'Itália', flag: '🇮🇹', demand: 'high', demandLabel: 'Alta procura' },
  { id: 'JP', name: 'Japão', flag: '🇯🇵', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'TH', name: 'Tailândia', flag: '🇹🇭', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'GR', name: 'Grécia', flag: '🇬🇷', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'TR', name: 'Turquia', flag: '🇹🇷', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'PE', name: 'Peru', flag: '🇵🇪', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'CL', name: 'Chile', flag: '🇨🇱', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'DE', name: 'Alemanha', flag: '🇩🇪', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'GB', name: 'Reino Unido', flag: '🇬🇧', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'AU', name: 'Austrália', flag: '🇦🇺', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'EG', name: 'Egito', flag: '🇪🇬', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'MA', name: 'Marrocos', flag: '🇲🇦', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'ZA', name: 'África do Sul', flag: '🇿🇦', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'IN', name: 'Índia', flag: '🇮🇳', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'KR', name: 'Coreia do Sul', flag: '🇰🇷', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'CR', name: 'Costa Rica', flag: '🇨🇷', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'UY', name: 'Uruguai', flag: '🇺🇾', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'CU', name: 'Cuba', flag: '🇨🇺', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'HR', name: 'Croácia', flag: '🇭🇷', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'NZ', name: 'Nova Zelândia', flag: '🇳🇿', demand: 'low', demandLabel: 'Baixa procura' },
  { id: 'ID', name: 'Indonésia', flag: '🇮🇩', demand: 'moderate', demandLabel: 'Moderada' },
  { id: 'PH', name: 'Filipinas', flag: '🇵🇭', demand: 'low', demandLabel: 'Baixa procura' },
];

export const demandColors: Record<string, string> = {
  high: 'bg-destructive/10 text-destructive',
  moderate: 'bg-primary/10 text-primary',
  low: 'bg-secondary/20 text-secondary',
};
