// Fixed constants based on provided sources
export const CONSTANTS = {
  FLIGHT_ATTENDANTS: 10000, // AP News source
  UNPAID_HOURS_PER_MONTH: 35, // CUPE campaign data
  UNPAID_HOURS_PER_YEAR: 35 * 12, // 420 hours annually
  PARITY_BENCHMARK_WAGE: 40.38, // Industry top-tier rate
};

export interface CalculatorInputs {
  paidHoursPerMonth: number;
  baseHourlyWage: number;
  wageIncreasePercent: number;
  unpaidHoursPercent: number;
  dailyStrikeCost: number;
  timeHorizonYears: number;
  npvDiscountRate: number;
  parityLockEnabled: boolean;
}

export interface CalculatorResults {
  // Per FA calculations
  currentAnnualPay: number;
  scenarioAnnualPay: number;
  deltaPerFA: number;
  
  // Company-wide calculations
  addedAnnualCost: number;
  annualCostAllUnpaidAtCurrent: number;
  yearsFundedByOneStrikeDay: number;
  strikeDaysEquivForOneYear: number;
  
  // Multi-year calculations
  settlementTotal: number;
  settlementNPV: number;
  strikeBurnTotal: number;
  
  // Additional metrics for narratives
  unpaidValueAtCurrent: number;
  unpaidValueAtScenario: number;
  percentIncrease: number;
}

export function calculateScenario(inputs: CalculatorInputs): CalculatorResults {
  const {
    paidHoursPerMonth,
    baseHourlyWage,
    wageIncreasePercent,
    unpaidHoursPercent,
    dailyStrikeCost,
    timeHorizonYears,
    npvDiscountRate,
    parityLockEnabled
  } = inputs;

  // Determine effective base wage
  const effectiveBaseWage = parityLockEnabled ? CONSTANTS.PARITY_BENCHMARK_WAGE : baseHourlyWage;
  
  // Calculate annual hours
  const paidHoursPerYear = paidHoursPerMonth * 12;
  
  // Calculate scenario hourly rate
  const scenarioHourlyRate = effectiveBaseWage * (1 + wageIncreasePercent / 100);
  
  // Per-attendant calculations
  const currentAnnualPay = paidHoursPerYear * effectiveBaseWage;
  const scenarioAnnualPay = (paidHoursPerYear * scenarioHourlyRate) + 
    (CONSTANTS.UNPAID_HOURS_PER_YEAR * scenarioHourlyRate * unpaidHoursPercent / 100);
  const deltaPerFA = scenarioAnnualPay - currentAnnualPay;
  
  // Company-level calculations
  const addedAnnualCost = deltaPerFA * CONSTANTS.FLIGHT_ATTENDANTS;
  const annualCostAllUnpaidAtCurrent = CONSTANTS.FLIGHT_ATTENDANTS * CONSTANTS.UNPAID_HOURS_PER_YEAR * effectiveBaseWage;
  const yearsFundedByOneStrikeDay = dailyStrikeCost / annualCostAllUnpaidAtCurrent;
  const strikeDaysEquivForOneYear = addedAnnualCost / dailyStrikeCost;
  
  // Multi-year calculations
  const settlementTotal = addedAnnualCost * timeHorizonYears;
  
  // NPV calculation
  let settlementNPV: number;
  if (npvDiscountRate > 0) {
    const r = npvDiscountRate / 100;
    settlementNPV = addedAnnualCost * (1 - Math.pow(1 + r, -timeHorizonYears)) / r;
  } else {
    settlementNPV = settlementTotal;
  }
  
  const strikeBurnTotal = dailyStrikeCost * 365 * timeHorizonYears;
  
  // Additional metrics
  const unpaidValueAtCurrent = CONSTANTS.UNPAID_HOURS_PER_YEAR * effectiveBaseWage;
  const unpaidValueAtScenario = CONSTANTS.UNPAID_HOURS_PER_YEAR * scenarioHourlyRate * unpaidHoursPercent / 100;
  const percentIncrease = currentAnnualPay > 0 ? ((scenarioAnnualPay - currentAnnualPay) / currentAnnualPay) * 100 : 0;
  
  return {
    currentAnnualPay,
    scenarioAnnualPay,
    deltaPerFA,
    addedAnnualCost,
    annualCostAllUnpaidAtCurrent,
    yearsFundedByOneStrikeDay,
    strikeDaysEquivForOneYear,
    settlementTotal,
    settlementNPV,
    strikeBurnTotal,
    unpaidValueAtCurrent,
    unpaidValueAtScenario,
    percentIncrease
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

// Preset configurations
export const PRESETS = {
  current: {
    paidHoursPerMonth: 80,
    baseHourlyWage: 30,
    wageIncreasePercent: 0,
    unpaidHoursPercent: 0,
    parityLockEnabled: false
  },
  airCanadaOffer: {
    paidHoursPerMonth: 80,
    baseHourlyWage: 30,
    wageIncreasePercent: 0,
    unpaidHoursPercent: 50,
    parityLockEnabled: false
  },
  parityWagesOnly: {
    paidHoursPerMonth: 80,
    baseHourlyWage: 30, // Will be overridden by parity lock
    wageIncreasePercent: 0,
    unpaidHoursPercent: 0,
    parityLockEnabled: true
  },
  parityPlus50Unpaid: {
    paidHoursPerMonth: 80,
    baseHourlyWage: 30, // Will be overridden by parity lock
    wageIncreasePercent: 0,
    unpaidHoursPercent: 50,
    parityLockEnabled: true
  },
  parityPlus100Unpaid: {
    paidHoursPerMonth: 80,
    baseHourlyWage: 30, // Will be overridden by parity lock
    wageIncreasePercent: 0,
    unpaidHoursPercent: 100,
    parityLockEnabled: true
  }
};

export const DATA_SOURCES = [
  {
    label: "AP (strike, 10,000 FAs)",
    url: "https://apnews.com/article/eca99afe8651b9bf64acd708ae987f5f"
  },
  {
    label: "CUPE campaign (unpaid work context)",
    url: "https://unpaidworkwontfly.ca/"
  },
  {
    label: "CUPE explainer (why unpaid exists)",
    url: "https://cupe.ca/unpaid-work-wont-fly"
  },
  {
    label: "Air Canada offer details (38% package, 50% boarding/ground pay)",
    url: "https://www.aircanada.com/media/air-canada-provides-clarity-on-its-offer-to-cupe/"
  },
  {
    label: "Reuters context on offer/strike",
    url: "https://www.reuters.com/business/world-at-work/air-canada-resume-flights-after-government-moves-end-strike-2025-08-17/"
  },
  {
    label: "Daily strike cost estimate C$50–60M",
    url: "https://finance.yahoo.com/news/much-money-air-canada-lose-140011375.html"
  }
];