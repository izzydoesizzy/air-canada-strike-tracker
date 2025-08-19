import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/utils/calculatorLogic';
import InformativeTooltip from './InformativeTooltip';

interface ContractValueAnalyzerProps {
  annualSettlementCost: number;
  currentStrikeLoss: number;
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const ContractValueAnalyzer: React.FC<ContractValueAnalyzerProps> = ({
  annualSettlementCost,
  currentStrikeLoss,
  selectedDuration,
  onDurationChange,
}) => {
  // Generate data for 1-10 years
  const contractData = Array.from({ length: 10 }, (_, index) => {
    const years = index + 1;
    const totalCost = annualSettlementCost * years;
    const breakEvenRatio = currentStrikeLoss / totalCost;
    
    return {
      years,
      totalCost,
      breakEvenRatio,
      isBreakEven: breakEvenRatio >= 0.8 && breakEvenRatio <= 1.2,
    };
  });

  // Chart data for visualization
  const chartData = contractData.map(item => ({
    year: item.years,
    cost: item.totalCost / 1000000, // Convert to millions for readability
    strikeLoss: currentStrikeLoss / 1000000,
  }));

  const selectedContract = contractData.find(item => item.years === selectedDuration);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Why Air Canada Resists Settlement
            <InformativeTooltip
              title="Long-term Cost Impact"
              content="While settling appears more expensive annually, Air Canada must consider the total contract value over multiple years. This analysis shows why management prefers to endure short-term strike losses rather than commit to long-term salary increases."
            />
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Multi-year contract cost analysis shows the cumulative financial commitment
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Duration Selector */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="font-medium">Contract Duration Analysis</label>
                <InformativeTooltip
                  title="Contract Duration Impact"
                  content="Longer contracts spread annual costs but increase total commitment. Use this slider to see how contract length affects Air Canada's total financial exposure."
                />
              </div>
              <div className="px-3">
                <Slider
                  value={[selectedDuration]}
                  onValueChange={(value) => onDurationChange(value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>1 year</span>
                  <span className="font-medium">{selectedDuration} years</span>
                  <span>10 years</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm font-medium text-red-700">Current Strike Loss</div>
                <div className="text-xl font-bold text-red-800">{formatCurrency(currentStrikeLoss, true)}</div>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="text-sm font-medium text-orange-700">Annual Settlement Cost</div>
                <div className="text-xl font-bold text-orange-800">{formatCurrency(annualSettlementCost, true)}</div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-700">{selectedDuration}-Year Total Commitment</div>
                <div className="text-xl font-bold text-blue-800">
                  {formatCurrency(selectedContract?.totalCost || 0, true)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Contract Cost vs Strike Loss Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Cost ($ Millions)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `$${value.toFixed(1)}M`, 
                    name === 'cost' ? 'Contract Cost' : 'Strike Loss'
                  ]}
                  labelFormatter={(year) => `Year ${year}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  name="Contract Cost"
                  dot={{ fill: '#f59e0b', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="strikeLoss" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Current Strike Loss"
                  dot={{ fill: '#ef4444', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            The orange line shows cumulative contract costs. The red dashed line shows current strike losses for comparison.
          </div>
        </CardContent>
      </Card>

      {/* Contract Value Table */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Year Contract Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total contract value and break-even analysis for different durations
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Duration</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>vs Strike Loss</TableHead>
                <TableHead>Break-Even</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractData.map((contract) => (
                <TableRow 
                  key={contract.years}
                  className={contract.years === selectedDuration ? 'bg-primary/5' : ''}
                >
                  <TableCell className="font-medium">{contract.years} year{contract.years > 1 ? 's' : ''}</TableCell>
                  <TableCell>{formatCurrency(contract.totalCost, true)}</TableCell>
                  <TableCell>
                    <span className={
                      contract.totalCost > currentStrikeLoss 
                        ? 'text-red-600' 
                        : 'text-green-600'
                    }>
                      {contract.totalCost > currentStrikeLoss ? '+' : ''}
                      {formatCurrency(contract.totalCost - currentStrikeLoss, true)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={contract.isBreakEven ? 'default' : 
                               contract.totalCost < currentStrikeLoss ? 'secondary' : 'destructive'}
                    >
                      {contract.breakEvenRatio < 0.8 ? 'Cheaper' :
                       contract.isBreakEven ? 'Break-even' : 'More expensive'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-orange-800">Management's Perspective</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Short-term pain vs long-term cost:</strong> Current strike losses of{' '}
                <span className="font-medium">{formatCurrency(currentStrikeLoss, true)}</span> may seem high, 
                but a {selectedDuration}-year contract costs{' '}
                <span className="font-medium">{formatCurrency(selectedContract?.totalCost || 0, true)}</span> total.
              </p>
              <p>
                <strong>Break-even point:</strong> The strike becomes more expensive than settling after approximately{' '}
                <span className="font-medium">
                  {Math.ceil(currentStrikeLoss / annualSettlementCost * 365)} days
                </span> of continued action.
              </p>
              <p>
                <strong>Why resist?</strong> Every percentage point in salary increases costs{' '}
                <span className="font-medium">
                  {formatCurrency(52000 * 10000 / 100 * selectedDuration, true)}
                </span> over {selectedDuration} years across all flight attendants.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractValueAnalyzer;