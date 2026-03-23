import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { calculateScenario, formatCurrency, formatNumber, CONSTANTS, type CalculatorInputs } from '@/utils/calculatorLogic';
import { TrendingUp, DollarSign, Users, Clock, Calculator } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import InformativeTooltip from './InformativeTooltip';
import SettlementCustomizer from './SettlementCustomizer';
import ContractValueAnalyzer from './ContractValueAnalyzer';
import LiveStrikeCostCounter from './LiveStrikeCostCounter';
import DualPerspectiveAnalysis from './DualPerspectiveAnalysis';

// Import strike data from dashboard
const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");
const STRIKE_END = new Date("2025-08-18T23:59:00-04:00");
const LOSS_PER_DAY = 100000000;

const StrikeVsSettlement: React.FC = () => {
  const { t } = useTranslation('calculator');
  const [selectedScenario, setSelectedScenario] = useState<string>('moderate');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<string>('preset');
  const [contractAnalysisDuration, setContractAnalysisDuration] = useState<number>(4);
  
  // Custom scenario state
  const [customSalaryIncrease, setCustomSalaryIncrease] = useState<number>(8);
  const [customUnpaidHours, setCustomUnpaidHours] = useState<number>(75);
  const [customContractDuration, setCustomContractDuration] = useState<number>(4);
  const [customParityLock, setCustomParityLock] = useState<boolean>(false);

  // Update current time every second for live strike data
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate strike duration and losses (capped at strike end)
  const cappedTime = Math.min(currentTime.getTime(), STRIKE_END.getTime());
  const timeElapsed = Math.max(0, cappedTime - STRIKE_START.getTime());
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
  const totalStrikeLoss = daysElapsed * LOSS_PER_DAY;
  const lossPerFA = totalStrikeLoss / CONSTANTS.FLIGHT_ATTENDANTS;

  // Air Canada's current offer as baseline
  const baselineOffer = {
    name: 'Air Canada Current Offer (Baseline)',
    description: 'Air Canada\'s latest proposal to flight attendants',
    salaryIncreasePercent: 2,
    unpaidHoursPercent: 50,
    contractDurationYears: 6,
    useParityLock: false,
  };

  // Scenario definitions - all compared against AC's current offer
  const scenarios = {
    currentOffer: baselineOffer,
    conservative: {
      name: 'Conservative Alternative',
      description: 'Slightly better than AC offer, minimal additional cost',
      salaryIncreasePercent: 4,
      unpaidHoursPercent: 60,
      contractDurationYears: 5,
      useParityLock: false,
    },
    moderate: {
      name: 'Moderate Compromise',
      description: 'Balanced approach between AC offer and union demands',
      salaryIncreasePercent: 8,
      unpaidHoursPercent: 75,
      contractDurationYears: 4,
      useParityLock: false,
    },
    competitive: {
      name: 'Competitive Package',
      description: 'Industry-competitive offer to end strike quickly',
      salaryIncreasePercent: 12,
      unpaidHoursPercent: 90,
      contractDurationYears: 4,
      useParityLock: false,
    },
    unionTarget: {
      name: 'Union Target',
      description: 'Full union demands including parity',
      salaryIncreasePercent: 15,
      unpaidHoursPercent: 100,
      contractDurationYears: 3,
      useParityLock: true,
    },
  };

  // Calculate scenario results
  const inputs: CalculatorInputs = useMemo(() => {
    if (activeTab === 'custom') {
      return {
        dailyStrikeCost: LOSS_PER_DAY,
        strikeDays: daysElapsed,
        salaryIncreasePercent: customSalaryIncrease,
        unpaidHoursPercent: customUnpaidHours,
        contractDurationYears: customContractDuration,
        useParityLock: customParityLock,
      };
    } else {
      return {
        dailyStrikeCost: LOSS_PER_DAY,
        strikeDays: daysElapsed,
        ...scenarios[selectedScenario as keyof typeof scenarios],
      };
    }
  }, [activeTab, selectedScenario, customSalaryIncrease, customUnpaidHours, customContractDuration, customParityLock, daysElapsed]);

  const results = useMemo(() => calculateScenario(inputs), [inputs]);
  
  // Calculate baseline (Air Canada's current offer) for comparison
  const baselineInputs: CalculatorInputs = useMemo(() => ({
    dailyStrikeCost: LOSS_PER_DAY,
    strikeDays: daysElapsed,
    ...baselineOffer,
  }), [daysElapsed]);
  
  const baselineResults = useMemo(() => calculateScenario(baselineInputs), [baselineInputs]);

  // Chart data for comparison - show baseline vs selected scenario
  const comparisonData = [
    {
      name: 'Strike Losses (Total)',
      value: totalStrikeLoss,
      color: '#ef4444',
      type: 'strike'
    },
    {
      name: 'AC Current Offer (Annual)',
      value: baselineResults.totalSettlementCostPerYear,
      color: '#94a3b8',
      type: 'baseline'
    },
    {
      name: `${activeTab === 'custom' ? 'Custom' : scenarios[selectedScenario as keyof typeof scenarios].name} (Annual)`,
      value: results.totalSettlementCostPerYear,
      color: '#22c55e',
      type: 'settlement'
    }
  ];

  const formatStrikeDuration = () => {
    const days = Math.floor(daysElapsed);
    const hours = Math.floor((daysElapsed - days) * 24);
    const minutes = Math.floor(((daysElapsed - days) * 24 - hours) * 60);
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''}, ${hours} hours, ${minutes} minutes`;
    } else if (hours > 0) {
      return `${hours} hours, ${minutes} minutes`;
    } else {
      return `${minutes} minutes`;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Strike vs Settlement</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare ongoing strike losses with potential settlement costs across different scenarios
          </p>
        </div>

        {/* Live Strike Stats */}
        <div className="mb-8">
          <LiveStrikeCostCounter
            strikeDuration={formatStrikeDuration()}
            totalLoss={totalStrikeLoss}
            lossPerFA={lossPerFA}
            dailyLossRate={LOSS_PER_DAY}
          />
        </div>

        {/* Scenario Selector with Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Settlement Scenario Builder
              <InformativeTooltip
                title="Settlement Scenarios"
                content="Compare pre-built settlement scenarios or create your own custom proposal. Each scenario shows the financial impact of different compensation packages."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preset">Preset Scenarios</TabsTrigger>
                <TabsTrigger value="custom">Custom Builder</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preset" className="space-y-4">
                <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(scenarios).map(([key, scenario]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex flex-col">
                          <span className="font-medium">{scenario.name}</span>
                          <span className="text-sm text-muted-foreground">{scenario.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="font-medium">Salary Increase</div>
                    <div className="text-lg">{inputs.salaryIncreasePercent}%</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="font-medium">Unpaid Work</div>
                    <div className="text-lg">{inputs.unpaidHoursPercent}%</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="font-medium">Contract Length</div>
                    <div className="text-lg">{inputs.contractDurationYears} years</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="font-medium">Hourly Rate</div>
                    <div className="text-lg">{inputs.useParityLock ? 'Parity' : 'Base'}</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="custom">
                <SettlementCustomizer
                  salaryIncreasePercent={customSalaryIncrease}
                  unpaidHoursPercent={customUnpaidHours}
                  contractDurationYears={customContractDuration}
                  useParityLock={customParityLock}
                  onSalaryIncreaseChange={setCustomSalaryIncrease}
                  onUnpaidHoursChange={setCustomUnpaidHours}
                  onContractDurationChange={setCustomContractDuration}
                  onParityLockChange={setCustomParityLock}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Dual Perspective Analysis */}
        <DualPerspectiveAnalysis
          results={results}
          baselineResults={baselineResults}
          inputs={inputs}
          totalStrikeLoss={totalStrikeLoss}
          selectedScenarioName={activeTab === 'custom' ? 'Custom Scenario' : scenarios[selectedScenario as keyof typeof scenarios].name}
        />

        {/* Strike vs Settlement Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Cost Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value, true)} />
                  <Tooltip formatter={(value) => formatCurrency(value as number, true)} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-lg font-semibold">
                Strike losses: <span className="text-red-600">{formatCurrency(totalStrikeLoss, true)}</span> vs 
                AC's current offer: <span className="text-gray-600">{formatCurrency(baselineResults.totalSettlementCostPerYear, true)}</span> vs 
                this scenario: <span className="text-green-600">{formatCurrency(results.totalSettlementCostPerYear, true)}</span> annually
              </div>
              <div className="text-sm text-muted-foreground">
                This scenario costs {formatCurrency(results.totalSettlementCostPerYear - baselineResults.totalSettlementCostPerYear, true)} more 
                annually than AC's current offer, but saves {formatCurrency(LOSS_PER_DAY, true)} daily by ending the strike
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Value Analysis */}
        <div className="mb-8">
          <ContractValueAnalyzer
            annualSettlementCost={results.totalSettlementCostPerYear}
            currentStrikeLoss={totalStrikeLoss}
            selectedDuration={contractAnalysisDuration}
            onDurationChange={setContractAnalysisDuration}
          />
        </div>

        {/* Key Insight */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <h3 className="text-xl font-bold">The Settlement Math</h3>
              <div className="space-y-2 text-lg">
                <p>
                  This scenario gives flight attendants <span className="font-bold text-green-600">
                    {formatCurrency(results.salaryIncreasePerFA - baselineResults.salaryIncreasePerFA)}
                  </span> more annually than Air Canada's current offer 
                  ({formatCurrency(results.salaryIncreasePerFA)} vs {formatCurrency(baselineResults.salaryIncreasePerFA)}).
                </p>
                <p>
                  It costs Air Canada <span className="font-bold text-orange-600">
                    {formatCurrency(results.totalSettlementCostPerYear - baselineResults.totalSettlementCostPerYear, true)}
                  </span> more per year than their current offer, but the strike has already cost{' '}
                  <span className="font-bold text-red-600">{formatCurrency(totalStrikeLoss, true)}</span>.
                </p>
                <p className="text-base text-muted-foreground">
                  The accumulated strike losses could fund the additional settlement cost for{' '}
                  <strong>
                    {formatNumber(totalStrikeLoss / (results.totalSettlementCostPerYear - baselineResults.totalSettlementCostPerYear), 1)} years
                  </strong>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StrikeVsSettlement;