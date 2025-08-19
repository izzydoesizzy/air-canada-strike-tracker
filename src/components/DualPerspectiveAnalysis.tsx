import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency, formatNumber, type CalculatorInputs } from '@/utils/calculatorLogic';
import { Users, Building2, TrendingUp, AlertTriangle } from 'lucide-react';
import InformativeTooltip from './InformativeTooltip';

interface DualPerspectiveAnalysisProps {
  results: any;
  baselineResults: any;
  inputs: CalculatorInputs;
  totalStrikeLoss: number;
  selectedScenarioName: string;
}

const DualPerspectiveAnalysis: React.FC<DualPerspectiveAnalysisProps> = ({
  results,
  baselineResults,
  inputs,
  totalStrikeLoss,
  selectedScenarioName,
}) => {
  // Calculate differences from baseline
  const additionalAnnualCost = results.totalSettlementCostPerYear - baselineResults.totalSettlementCostPerYear;
  const additionalPerFACost = results.salaryIncreasePerFA - baselineResults.salaryIncreasePerFA;
  const costMultiplier = results.totalSettlementCostPerYear / baselineResults.totalSettlementCostPerYear;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Dual Perspective Analysis
          <InformativeTooltip
            title="Flight Attendant vs Air Canada Views"
            content="See how the same settlement looks from both the flight attendant perspective (benefits gained) and Air Canada's perspective (costs incurred)."
          />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          How this settlement compares to Air Canada's current offer from both perspectives
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Flight Attendant View
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Air Canada View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-4">
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-4">What Flight Attendants Gain</h3>
              
              {/* Baseline vs Proposed Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded border">
                  <div className="text-sm text-muted-foreground">Air Canada's Current Offer</div>
                  <div className="text-2xl font-bold">{formatCurrency(baselineResults.salaryIncreasePerFA)}</div>
                  <div className="text-xs text-muted-foreground">Annual increase per FA</div>
                </div>
                <div className="p-4 bg-green-100 rounded border border-green-300">
                  <div className="text-sm text-green-700">{selectedScenarioName}</div>
                  <div className="text-2xl font-bold text-green-800">{formatCurrency(results.salaryIncreasePerFA)}</div>
                  <div className="text-xs text-green-600">Annual increase per FA</div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Additional annual income (vs AC offer)</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    +{formatCurrency(additionalPerFACost)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Hourly rate improvement</span>
                  <span className="font-medium">
                    {formatCurrency(baselineResults.hourlyRateNew)} → {formatCurrency(results.hourlyRateNew)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Unpaid work compensation</span>
                  <span className="font-medium">{inputs.unpaidHoursPercent}% of unpaid hours covered</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Contract security</span>
                  <span className="font-medium">{inputs.contractDurationYears} years guaranteed</span>
                </div>
              </div>

              {/* Career Impact */}
              <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Career Value Impact</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Additional lifetime earnings (30-year career):</span>
                    <span className="font-bold text-blue-800">
                      +{formatCurrency(additionalPerFACost * 30, true)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pension contribution boost:</span>
                    <span className="font-medium">~{formatCurrency(additionalPerFACost * 0.08)} annually</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">What Air Canada Pays</h3>
              
              {/* Cost Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded border">
                  <div className="text-sm text-muted-foreground">Current Offer Cost (Annual)</div>
                  <div className="text-2xl font-bold">{formatCurrency(baselineResults.totalSettlementCostPerYear, true)}</div>
                  <div className="text-xs text-muted-foreground">Base commitment</div>
                </div>
                <div className="p-4 bg-orange-100 rounded border border-orange-300">
                  <div className="text-sm text-orange-700">{selectedScenarioName} Cost</div>
                  <div className="text-2xl font-bold text-orange-800">{formatCurrency(results.totalSettlementCostPerYear, true)}</div>
                  <div className="text-xs text-orange-600">
                    {costMultiplier > 1 ? `${((costMultiplier - 1) * 100).toFixed(1)}% more expensive` : 'Same cost'}
                  </div>
                </div>
              </div>

              {/* Financial Impact */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Additional annual cost (vs current offer)</span>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800">
                    {additionalAnnualCost > 0 ? `+${formatCurrency(additionalAnnualCost, true)}` : 'No additional cost'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Daily settlement cost</span>
                  <span className="font-medium">{formatCurrency(results.totalSettlementCostPerYear / 365, true)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Strike cost saved per day</span>
                  <span className="font-medium text-green-600">{formatCurrency(100000000, true)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Strike losses accumulated</span>
                  <span className="font-medium text-red-600">{formatCurrency(totalStrikeLoss, true)}</span>
                </div>
              </div>

              {/* Why Resistance */}
              <div className="mt-6 p-4 bg-red-50 rounded border border-red-200">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <h4 className="font-medium text-red-800">Why Air Canada Resists This Settlement</h4>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Contract value ({inputs.contractDurationYears} years):</span>
                    <span className="font-bold text-red-800">
                      {formatCurrency(results.contractTotalValue, true)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional commitment vs current offer:</span>
                    <span className="font-bold text-red-800">
                      +{formatCurrency(additionalAnnualCost * inputs.contractDurationYears, true)}
                    </span>
                  </div>
                  <div className="text-xs text-red-600 mt-2">
                    This would set a precedent for all future negotiations and other employee groups
                  </div>
                </div>
              </div>

              {/* Break-even Analysis */}
              <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Break-even Point</h4>
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>Strike days to equal this settlement cost:</span>
                    <span className="font-bold">{formatNumber(results.settlementEquivalentStrikeDays, 1)} days</span>
                  </div>
                  <div className="text-xs text-yellow-700 mt-1">
                    After this point, continuing the strike becomes more expensive than settling
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Summary Insight */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium mb-2">Settlement Reality Check</h4>
          <div className="text-sm space-y-1">
            <p>
              <strong>For Flight Attendants:</strong> This scenario provides {formatCurrency(additionalPerFACost)} more per year 
              than Air Canada's current offer, worth {formatCurrency(additionalPerFACost * 30, true)} over a 30-year career.
            </p>
            <p>
              <strong>For Air Canada:</strong> This costs {formatCurrency(additionalAnnualCost, true)} more annually than their current offer, 
              but saves {formatCurrency(100000000, true)} per day by ending the strike.
            </p>
            <p className="text-muted-foreground">
              The strike has already cost {formatCurrency(totalStrikeLoss, true)} - enough to fund the additional 
              settlement cost for {formatNumber(totalStrikeLoss / additionalAnnualCost, 1)} years.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DualPerspectiveAnalysis;