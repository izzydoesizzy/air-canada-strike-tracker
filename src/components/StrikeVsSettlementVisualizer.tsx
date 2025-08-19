import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { TrendingUp, AlertTriangle, DollarSign, Clock, Plane, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import strike constants from dashboard
const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");
const LOSS_PER_DAY = 100000000; // $100M per day
const FLIGHT_ATTENDANTS = 10511;

interface ScenarioData {
  id: string;
  name: string;
  description: string;
  salaryIncrease: number;
  unpaidWorkCoverage: number;
  contractYears: number;
  annualCost: number;
  totalCost: number;
  urgency: "low" | "medium" | "high";
  color: string;
  type: "conservative" | "current" | "moderate" | "union" | "benchmark";
}

const scenarios: ScenarioData[] = [
  {
    id: "conservative",
    name: "Conservative Settlement",
    description: "Minimal concessions to end strike quickly",
    salaryIncrease: 3,
    unpaidWorkCoverage: 25,
    contractYears: 5,
    annualCost: 45000000,
    totalCost: 225000000,
    urgency: "high",
    color: "hsl(142, 76%, 36%)",
    type: "conservative"
  },
  {
    id: "current",
    name: "Current AC Offer",
    description: "Management's latest proposal",
    salaryIncrease: 2,
    unpaidWorkCoverage: 50,
    contractYears: 6,
    annualCost: 38000000,
    totalCost: 228000000,
    urgency: "high",
    color: "hsl(217, 91%, 60%)",
    type: "current"
  },
  {
    id: "moderate",
    name: "Moderate Compromise",
    description: "Balanced approach for both parties",
    salaryIncrease: 8,
    unpaidWorkCoverage: 75,
    contractYears: 4,
    annualCost: 89000000,
    totalCost: 356000000,
    urgency: "medium",
    color: "hsl(45, 93%, 47%)",
    type: "moderate"
  },
  {
    id: "union",
    name: "Union Target",
    description: "Full union demands",
    salaryIncrease: 15,
    unpaidWorkCoverage: 100,
    contractYears: 3,
    annualCost: 165000000,
    totalCost: 495000000,
    urgency: "low",
    color: "hsl(0, 72%, 51%)",
    type: "union"
  },
  {
    id: "benchmark",
    name: "Industry Benchmark",
    description: "Market-competitive package",
    salaryIncrease: 10,
    unpaidWorkCoverage: 100,
    contractYears: 4,
    annualCost: 125000000,
    totalCost: 500000000,
    urgency: "low",
    color: "hsl(262, 83%, 58%)",
    type: "benchmark"
  }
];

export function StrikeVsSettlementVisualizer() {
  const { t } = useTranslation(['calculator', 'dashboard']);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate live strike data
  const timeElapsed = Math.max(0, currentTime.getTime() - STRIKE_START.getTime());
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
  const totalStrikeLoss = daysElapsed * LOSS_PER_DAY;
  const lossPerFA = totalStrikeLoss / FLIGHT_ATTENDANTS;

  // Calculate strike duration components
  const daysElapsedWhole = Math.floor(daysElapsed);
  const hoursElapsed = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesElapsed = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));

  const formatCurrency = (amount: number, compact = true) => {
    if (compact) {
      if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
      if (amount >= 1000000) return `$${(amount / 1000000).toFixed(0)}M`;
      if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateBreakEvenDays = (scenarioTotalCost: number) => {
    return scenarioTotalCost / LOSS_PER_DAY;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "hsl(142, 76%, 36%)";
      case "medium": return "hsl(45, 93%, 47%)";
      case "low": return "hsl(0, 72%, 51%)";
      default: return "hsl(217, 91%, 60%)";
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case "high": return "Immediate Settlement";
      case "medium": return "Moderate Urgency";
      case "low": return "Low Priority";
      default: return "Standard";
    }
  };

  const shareScenario = () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    navigator.clipboard.writeText(url);
  };

  // Create chart data for comparison
  const comparisonData = scenarios.map(scenario => ({
    name: scenario.name.split(' ')[0],
    "Strike Cost": totalStrikeLoss,
    "Settlement Cost": scenario.totalCost,
    breakEven: calculateBreakEvenDays(scenario.totalCost),
    urgency: scenario.urgency
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue/5 via-background to-primary-blue-subtle">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-blue/10 border border-primary-blue/20 rounded-full">
            <Plane className="h-4 w-4 text-primary-blue" />
            <span className="text-xs font-medium text-primary-blue uppercase tracking-wide">
              Air Canada Labour Dispute
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">
            Strike vs Settlement Visualizer
          </h1>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span>Real-time financial impact analysis</span>
            <span>•</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={shareScenario}
              className="text-primary hover:text-primary/80"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Live Strike Stats Header */}
        <Card className="p-6 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5 text-loss-indicator" />
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Strike Duration
                </h3>
              </div>
              <div className="text-2xl font-mono text-loss-indicator">
                {daysElapsedWhole}d {hoursElapsed}h {minutesElapsed}m
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5 text-loss-indicator" />
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Total Strike Losses
                </h3>
              </div>
              <div className="text-2xl font-mono text-loss-indicator">
                {formatCurrency(totalStrikeLoss)}
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <DollarSign className="h-5 w-5 text-loss-indicator" />
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Loss Per Flight Attendant
                </h3>
              </div>
              <div className="text-2xl font-mono text-loss-indicator">
                {formatCurrency(lossPerFA)}
              </div>
            </div>
          </div>
        </Card>

        {/* Settlement Scenarios Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Settlement Scenarios</h2>
            <p className="text-muted-foreground">
              Compare strike costs with potential settlement values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => {
              const breakEvenDays = calculateBreakEvenDays(scenario.totalCost);
              const isBreakEvenPassed = daysElapsed > breakEvenDays;
              const savingsIfSettledToday = totalStrikeLoss > scenario.totalCost 
                ? totalStrikeLoss - scenario.totalCost 
                : 0;

              return (
                <Card 
                  key={scenario.id} 
                  className="p-6 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Scenario Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{scenario.name}</h3>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        style={{ 
                          borderColor: getUrgencyColor(scenario.urgency),
                          color: getUrgencyColor(scenario.urgency)
                        }}
                      >
                        {getUrgencyText(scenario.urgency)}
                      </Badge>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Salary Increase</div>
                        <div className="text-xl font-mono" style={{ color: scenario.color }}>
                          {scenario.salaryIncrease}%
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Unpaid Work</div>
                        <div className="text-xl font-mono" style={{ color: scenario.color }}>
                          {scenario.unpaidWorkCoverage}%
                        </div>
                      </div>
                    </div>

                    {/* Cost Comparison Chart */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Cost Comparison</div>
                      <div className="h-16">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Strike Cost", value: totalStrikeLoss, type: "strike" },
                              { name: "Settlement", value: scenario.totalCost, type: "settlement" }
                            ]}
                            layout="horizontal"
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                          >
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" hide />
                            <Bar dataKey="value" radius={4}>
                              <Cell fill="hsl(var(--loss-indicator))" />
                              <Cell fill={scenario.color} />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="space-y-3 pt-3 border-t border-border/30">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Settlement Cost:</span>
                        <span className="font-mono font-medium" style={{ color: scenario.color }}>
                          {formatCurrency(scenario.totalCost)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Break-even Point:</span>
                        <span className="font-mono font-medium text-foreground">
                          {breakEvenDays.toFixed(1)} days
                        </span>
                      </div>

                      {isBreakEvenPassed && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Potential Savings:</span>
                          <span className="font-mono font-medium text-green-600">
                            {formatCurrency(savingsIfSettledToday)}
                          </span>
                        </div>
                      )}

                      {!isBreakEvenPassed && (
                        <div className="flex items-center space-x-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-muted-foreground">
                            Strike cost will exceed settlement in {(breakEvenDays - daysElapsed).toFixed(1)} days
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Summary Analytics */}
        <Card className="p-8 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-xl">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Executive Summary</h2>
              <p className="text-muted-foreground">
                The cost of continued negotiations vs immediate settlement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Strike Cost Accumulation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Strike Cost Accumulation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Per Day:</span>
                    <span className="font-mono text-loss-indicator">{formatCurrency(LOSS_PER_DAY)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Per Hour:</span>
                    <span className="font-mono text-loss-indicator">{formatCurrency(LOSS_PER_DAY / 24)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Per Minute:</span>
                    <span className="font-mono text-loss-indicator">{formatCurrency(LOSS_PER_DAY / (24 * 60))}</span>
                  </div>
                </div>
              </div>

              {/* Settlement Recommendation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Settlement Window</h3>
                <div className="space-y-3">
                  {scenarios.slice(0, 2).map((scenario) => {
                    const breakEvenDays = calculateBreakEvenDays(scenario.totalCost);
                    const isUrgent = daysElapsed > breakEvenDays * 0.8;
                    
                    return (
                      <div key={scenario.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{scenario.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Break-even: {breakEvenDays.toFixed(1)} days
                          </div>
                        </div>
                        {isUrgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-muted-foreground/70 bg-muted/20 px-3 py-1 rounded-full border border-border/30">
            <span className="font-medium text-warning">PROJECTED</span>
            <span>•</span>
            <span>Financial estimates based on ongoing strike data and industry analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}