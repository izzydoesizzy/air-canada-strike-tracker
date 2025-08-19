export const CONSTANTS = {
  FLIGHT_ATTENDANTS: 10000,
  UNPAID_HOURS_PER_MONTH: 35,
  UNPAID_HOURS_PER_YEAR: 35 * 12, // 420
  BASE_HOURLY_TODAY: 30, // CAD
  PARITY_HOURLY: 40.38, // Air Transat benchmark
};

export interface CalculatorInputs {
  dailyStrikeCost: number;
  strikeDays: number;
  unpaidHoursPercent: number; // 0, 50, or 100
  useParityLock: boolean;
}

export interface CalculatorResults {
  totalStrikeLoss: number;
  perFAStrikeLump: number;
  perFAStrikeEquivalent1Year: number;
  perFAStrikeEquivalent4Years: number;
  perFAStrikeEquivalent10Years: number;
  yearsFundedByOneStrikeDay: number;
  unionAskPerFAPerYear: number;
  scenarioHourly: number;
  annualCostAllUnpaidAtCurrent: number;
}

export function calculateScenario(inputs: CalculatorInputs): CalculatorResults {
  const { dailyStrikeCost, strikeDays, unpaidHoursPercent, useParityLock } = inputs;

  // Convert percentage to decimal
  const unpaidHoursDecimal = unpaidHoursPercent / 100;
  
  // Determine hourly rate
  const scenarioHourly = useParityLock ? CONSTANTS.PARITY_HOURLY : CONSTANTS.BASE_HOURLY_TODAY;
  
  // Strike loss calculations
  const totalStrikeLoss = dailyStrikeCost * strikeDays;
  const perFAStrikeLump = totalStrikeLoss / CONSTANTS.FLIGHT_ATTENDANTS;
  
  // Per-FA strike equivalents over different time horizons
  const perFAStrikeEquivalent1Year = perFAStrikeLump / 1;
  const perFAStrikeEquivalent4Years = perFAStrikeLump / 4;
  const perFAStrikeEquivalent10Years = perFAStrikeLump / 10;
  
  // Annual cost to pay all unpaid hours at current base rate
  const annualCostAllUnpaidAtCurrent = CONSTANTS.FLIGHT_ATTENDANTS * CONSTANTS.UNPAID_HOURS_PER_YEAR * CONSTANTS.BASE_HOURLY_TODAY;
  
  // How many years of paying all unpaid hours could one strike day fund?
  const yearsFundedByOneStrikeDay = dailyStrikeCost / annualCostAllUnpaidAtCurrent;
  
  // Union ask: pay for unpaid hours
  const unionAskPerFAPerYear = CONSTANTS.UNPAID_HOURS_PER_YEAR * scenarioHourly * unpaidHoursDecimal;

  return {
    totalStrikeLoss,
    perFAStrikeLump,
    perFAStrikeEquivalent1Year,
    perFAStrikeEquivalent4Years,
    perFAStrikeEquivalent10Years,
    yearsFundedByOneStrikeDay,
    unionAskPerFAPerYear,
    scenarioHourly,
    annualCostAllUnpaidAtCurrent,
  };
}

export function formatCurrency(amount: number, compact: boolean = false): string {
  if (compact && Math.abs(amount) >= 1000000) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-CA', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(num);
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  dailyStrikeCost: 100000000, // $100M default
  strikeDays: 3, // Current as of Aug 18, 2025
  unpaidHoursPercent: 50, // Air Canada's offer
  useParityLock: false,
};

export const DATA_SOURCES = [
  {
    label: "Flight Attendants: 10,000",
    context: "AP News - Strike coverage",
    url: "https://apnews.com/article/eca99afe8651b9bf64acd708ae987f5f"
  },
  {
    label: "Unpaid Hours: 35/month",
    context: "CUPE - Unpaid work campaign",
    url: "https://unpaidworkwontfly.ca/"
  },
  {
    label: "Unpaid Work Details",
    context: "CUPE - Work explainer",
    url: "https://cupe.ca/unpaid-work-wont-fly"
  },
  {
    label: "Strike Cost: $50-60M revenue",
    context: "Yahoo Finance - Daily impact",
    url: "https://finance.yahoo.com/news/much-money-air-canada-lose-140011375.html"
  },
  {
    label: "Strike Cost: ~$75M EBITDA",
    context: "Reuters - Analyst estimates",
    url: "https://www.reuters.com/business/world-at-work/canadian-government-moves-end-air-canada-strike-seeks-binding-arbitration-2025-08-16/"
  },
  {
    label: "Air Canada Offer: 50% ground pay",
    context: "AC Media - Company position",
    url: "https://www.aircanada.com/media/air-canada-provides-clarity-on-its-offer-to-cupe/"
  },
  {
    label: "Parity Benchmark: Air Transat",
    context: "CUPE - Industry comparison",
    url: "https://cupe.ca/air-transat-flight-attendants-now-highest-paid-industry"
  },
  {
    label: "Three-Day Estimate: ~$300M",
    context: "Financial Post - TD analysis",
    url: "https://financialpost.com/transportation/airlines/air-canada-risks-pyrrhic-victory-in-sending-flight-attendants-to-the-picket-lines-says-td-analyst"
  }
];