import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '@/utils/calculatorLogic';
import type { CalculatorResults, CalculatorInputs } from '@/utils/calculatorLogic';

interface CalculatorChartsProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
  useNPV: boolean;
}

export const CalculatorCharts: React.FC<CalculatorChartsProps> = ({ results, inputs, useNPV }) => {
  const { t } = useTranslation('calculator');

  // Prepare waterfall chart data
  const waterfallData = [
    {
      name: t('charts.waterfallLabels.basePay'),
      value: results.currentAnnualPay,
      fill: 'hsl(var(--primary))'
    },
    {
      name: t('charts.waterfallLabels.wageIncrease'),
      value: (results.currentAnnualPay * inputs.wageIncreasePercent / 100),
      fill: 'hsl(var(--blue-500))'
    },
    {
      name: t('charts.waterfallLabels.unpaidPay'),
      value: results.unpaidValueAtScenario,
      fill: 'hsl(var(--green-500))'
    },
    {
      name: t('charts.waterfallLabels.total'),
      value: results.scenarioAnnualPay,
      fill: 'hsl(var(--primary))',
      stroke: 'hsl(var(--primary))',
      strokeWidth: 2
    }
  ];

  // Prepare comparison chart data
  const comparisonData = [
    {
      name: t('charts.comparisonLabels.annualCost'),
      value: results.addedAnnualCost,
      fill: 'hsl(var(--blue-500))'
    },
    {
      name: t('charts.comparisonLabels.oneDayStrike'),
      value: inputs.dailyStrikeCost,
      fill: 'hsl(var(--red-500))'
    },
    {
      name: t('charts.comparisonLabels.settlementTotal', { years: inputs.timeHorizonYears }),
      value: useNPV ? results.settlementNPV : results.settlementTotal,
      fill: 'hsl(var(--green-500))'
    },
    {
      name: t('charts.comparisonLabels.strikeBurn', { years: inputs.timeHorizonYears }),
      value: results.strikeBurnTotal,
      fill: 'hsl(var(--red-600))'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-primary">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Per-FA Waterfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('charts.waterfallTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={waterfallData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => formatCurrency(value, true)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {waterfallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.stroke} strokeWidth={entry.strokeWidth} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Settlement vs Strike Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('charts.comparisonTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => formatCurrency(value, true)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};