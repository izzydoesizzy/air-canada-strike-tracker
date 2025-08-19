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

// Import strike data from dashboard
const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");
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

  // Calculate live strike duration and losses
  const timeElapsed = Math.max(0, currentTime.getTime() - STRIKE_START.getTime());
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
  const totalStrikeLoss = daysElapsed * LOSS_PER_DAY;
  const lossPerFA = totalStrikeLoss / CONSTANTS.FLIGHT_ATTENDANTS;

  // Scenario definitions
  const scenarios = {
    conservative: {
      name: 'Conservative Settlement',
      description: 'Minimal increase, basic unpaid work coverage',
      salaryIncreasePercent: 3,
      unpaidHoursPercent: 25,
      contractDurationYears: 5,
      useParityLock: false,
    },
    currentOffer: {
      name: 'Current AC Offer',
      description: 'Air Canada\'s current proposal',
      salaryIncreasePercent: 2,
      unpaidHoursPercent: 50,
      contractDurationYears: 6,
      useParityLock: false,
    },
    moderate: {
      name: 'Moderate Compromise',
      description: 'Balanced approach between parties',
      salaryIncreasePercent: 8,
      unpaidHoursPercent: 75,
      contractDurationYears: 4,
      useParityLock: false,
    },
    unionTarget: {
      name: 'Union Target',
      description: 'Full union demands',
      salaryIncreasePercent: 15,
      unpaidHoursPercent: 100,
      contractDurationYears: 3,
      useParityLock: true,
    },
    industryBenchmark: {
      name: 'Industry Benchmark',
      description: 'Market-competitive package',
      salaryIncreasePercent: 10,
      unpaidHoursPercent: 100,
      contractDurationYears: 4,
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

  // Chart data for comparison
  const comparisonData = [
    {
      name: 'Strike Losses (Total)',
      value: totalStrikeLoss,
      color: '#ef4444',
      type: 'strike'
    },
    {
      name: 'Settlement (Annual)',
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

        {/* Enhanced Settlement Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Detailed Settlement Analysis
              <InformativeTooltip
                title="Settlement Breakdown"
                content="Comprehensive analysis of compensation changes per flight attendant and total company costs."
              />
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Per-flight attendant compensation breakdown and company cost analysis
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Current vs New Salary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Current Annual Salary</div>
                  <div className="text-2xl font-bold">{formatCurrency(results.currentAnnualSalary)}</div>
                  <div className="text-xs text-muted-foreground mt-1">Base compensation</div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm font-medium text-green-700">New Total Compensation</div>
                  <div className="text-2xl font-bold text-green-800">{formatCurrency(results.newAnnualSalary)}</div>
                  <div className="text-xs text-green-600 mt-1">Including all improvements</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-blue-700">Annual Increase</div>
                  <div className="text-2xl font-bold text-blue-800">+{formatCurrency(results.salaryIncreasePerFA)}</div>
                  <div className="text-xs text-blue-600 mt-1">Per flight attendant</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3">
                <h4 className="font-medium text-lg mb-3">Compensation Components</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center gap-2">
                      <span>Base Salary Increase ({inputs.salaryIncreasePercent}%)</span>
                      <InformativeTooltip
                        title="Base Salary Increase"
                        content="Percentage increase applied to the current annual salary of approximately $52,000."
                      />
                    </div>
                    <span className="font-medium">+{formatCurrency(results.salaryIncreaseComponent)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center gap-2">
                      <span>Unpaid Work Compensation ({inputs.unpaidHoursPercent}%)</span>
                      <InformativeTooltip
                        title="Unpaid Work Value"
                        content="Compensation for currently unpaid work including boarding, safety checks, and delays. Based on 35 hours per month at the selected hourly rate."
                        sourceUrl="https://unpaidworkwontfly.ca/"
                        sourceLabel="CUPE - Unpaid Work Details"
                      />
                    </div>
                    <span className="font-medium">+{formatCurrency(results.unpaidWorkComponent)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center gap-2">
                      <span>Hourly Rate</span>
                      <InformativeTooltip
                        title="Hourly Rate Comparison"
                        content={`Current: ${formatCurrency(results.hourlyRateOld)}/hour. ${inputs.useParityLock ? `Proposed: ${formatCurrency(results.hourlyRateNew)}/hour (Air Transat parity)` : 'Proposed: Same as current'}`}
                      />
                    </div>
                    <span className="font-medium">
                      {formatCurrency(results.hourlyRateOld)} → {formatCurrency(results.hourlyRateNew)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Company Impact */}
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg space-y-3">
                <h4 className="font-medium text-lg text-orange-800">Company Financial Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Annual Cost (All 10,000 FAs):</span>
                      <span className="font-bold">{formatCurrency(results.totalSettlementCostPerYear, true)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Settlement Cost:</span>
                      <span className="font-medium">{formatCurrency(results.totalSettlementCostPerYear / 365, true)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Contract Value ({inputs.contractDurationYears} years):</span>
                      <span className="font-bold">{formatCurrency(results.contractTotalValue, true)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Settlement = Strike Days:</span>
                      <span className="font-medium">{formatNumber(results.settlementEquivalentStrikeDays, 1)} days</span>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-2 border-t border-orange-300">
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                    This settlement costs the same as {formatNumber(results.settlementEquivalentStrikeDays, 1)} days of striking
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                The strike has cost <span className="text-red-600">{formatCurrency(totalStrikeLoss, true)}</span> vs 
                settlement costing <span className="text-green-600">{formatCurrency(results.totalSettlementCostPerYear, true)}</span> annually
              </div>
              <div className="text-sm text-muted-foreground">
                Every day of strike costs {formatCurrency(LOSS_PER_DAY, true)} — 
                this settlement would cost {formatCurrency(results.totalSettlementCostPerYear / 365, true)} per day
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
              <h3 className="text-xl font-bold">Key Insights</h3>
              <div className="space-y-2 text-lg">
                <p>
                  Settling today with the <strong>
                    {activeTab === 'custom' ? 'custom' : scenarios[selectedScenario as keyof typeof scenarios].name}
                  </strong> scenario would provide flight attendants with an annual increase of{' '}
                  <span className="font-bold text-green-600">{formatCurrency(results.salaryIncreasePerFA)}</span> each.
                </p>
                <p>
                  The strike has cost <span className="font-bold text-red-600">{formatCurrency(totalStrikeLoss, true)}</span> so far, 
                  while this settlement would cost Air Canada{' '}
                  <span className="font-bold text-orange-600">{formatCurrency(results.totalSettlementCostPerYear, true)}</span> annually.
                </p>
                <p className="text-base text-muted-foreground">
                  Every additional day of striking costs <strong>{formatCurrency(LOSS_PER_DAY, true)}</strong> — 
                  equivalent to <strong>{formatNumber(LOSS_PER_DAY / (results.totalSettlementCostPerYear / 365), 1)} days</strong> of this settlement.
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