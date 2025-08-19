import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { calculateScenario, formatCurrency, formatNumber, CONSTANTS, type CalculatorInputs } from '@/utils/calculatorLogic';
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

// Import strike data from dashboard
const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");
const LOSS_PER_DAY = 100000000;

const StrikeVsSettlement: React.FC = () => {
  const { t } = useTranslation('calculator');
  const [selectedScenario, setSelectedScenario] = useState<string>('moderate');
  const [currentTime, setCurrentTime] = useState(new Date());

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
  const inputs: CalculatorInputs = {
    dailyStrikeCost: LOSS_PER_DAY,
    strikeDays: daysElapsed,
    ...scenarios[selectedScenario as keyof typeof scenarios],
  };

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="text-center">
              <div className="text-sm font-medium text-red-700 mb-2">Strike Duration</div>
              <div className="text-xl font-bold text-red-800">{formatStrikeDuration()}</div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="text-center">
              <div className="text-sm font-medium text-red-700 mb-2">Total Losses</div>
              <div className="text-xl font-bold text-red-800">{formatCurrency(totalStrikeLoss, true)}</div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="text-center">
              <div className="text-sm font-medium text-red-700 mb-2">Loss Per Flight Attendant</div>
              <div className="text-xl font-bold text-red-800">{formatCurrency(lossPerFA)}</div>
            </div>
          </Card>
        </div>

        {/* Scenario Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Settlement Scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Main Comparison Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Settlement Analysis
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Comprehensive compensation breakdown per flight attendant
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Current vs New Salary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Current Annual Salary</div>
                  <div className="text-2xl font-bold">{formatCurrency(results.currentAnnualSalary)}</div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm font-medium text-green-700">New Total Compensation</div>
                  <div className="text-2xl font-bold text-green-800">{formatCurrency(results.newAnnualSalary)}</div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span>Salary Increase ({inputs.salaryIncreasePercent}%)</span>
                  <span className="font-medium">+{formatCurrency(results.currentAnnualSalary * inputs.salaryIncreasePercent / 100)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Unpaid Work Value</span>
                  <span className="font-medium">+{formatCurrency(results.unionAskPerFAPerYear)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total Increase per FA</span>
                  <span className="text-green-600">+{formatCurrency(results.salaryIncreasePerFA)}</span>
                </div>
              </div>

              {/* Company Costs */}
              <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Total Annual Cost (All FAs)</span>
                  <span className="font-bold">{formatCurrency(results.totalSettlementCostPerYear, true)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contract Value ({inputs.contractDurationYears} years)</span>
                  <span className="font-bold">{formatCurrency(results.contractTotalValue, true)}</span>
                </div>
                <div className="text-center pt-2 border-t">
                  <Badge variant="outline" className="text-primary font-medium">
                    Equivalent to {formatNumber(results.settlementEquivalentStrikeDays, 1)} strike days
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

        {/* Key Insight */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Key Insight</h3>
              <p className="text-lg">
                Settling today with the <strong>{scenarios[selectedScenario as keyof typeof scenarios].name}</strong> scenario 
                would save <span className="font-bold text-green-600">
                  {formatCurrency(Math.max(0, totalStrikeLoss - results.totalSettlementCostPerYear), true)}
                </span> compared to continuing the strike for one more year.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StrikeVsSettlement;