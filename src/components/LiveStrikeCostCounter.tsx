import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/calculatorLogic';
import { Clock, TrendingUp } from 'lucide-react';
import InformativeTooltip from './InformativeTooltip';

interface LiveStrikeCostCounterProps {
  strikeDuration: string;
  totalLoss: number;
  lossPerFA: number;
  dailyLossRate: number;
}

const LiveStrikeCostCounter: React.FC<LiveStrikeCostCounterProps> = ({
  strikeDuration,
  totalLoss,
  lossPerFA,
  dailyLossRate,
}) => {
  const [liveLoss, setLiveLoss] = useState(totalLoss);
  const [liveLossPerFA, setLiveLossPerFA] = useState(lossPerFA);

  // Calculate loss per second ($100M per day = $1,157 per second)
  const lossPerSecond = dailyLossRate / (24 * 60 * 60);
  const lossPerSecondPerFA = lossPerSecond / 10000; // 10,000 flight attendants

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveLoss(prev => prev + lossPerSecond);
      setLiveLossPerFA(prev => prev + lossPerSecondPerFA);
    }, 1000);

    return () => clearInterval(timer);
  }, [lossPerSecond, lossPerSecondPerFA]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 relative overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-red-700" />
              <span className="text-sm font-medium text-red-700">Strike Duration</span>
              <InformativeTooltip
                title="Strike Timeline"
                content="Time elapsed since Air Canada flight attendants began striking at 12:58 AM ET on Saturday, August 16, 2025."
              />
            </div>
            <div className="text-xl font-bold text-red-800">{strikeDuration}</div>
          </div>
        </CardContent>
        {/* Subtle animation indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-200">
          <div className="h-full bg-red-400 animate-pulse"></div>
        </div>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 relative overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-red-700" />
              <span className="text-sm font-medium text-red-700">Total Losses</span>
              <InformativeTooltip
                title="Cumulative Strike Cost"
                content="Estimated total financial impact to Air Canada based on $100M daily losses from cancelled flights, rebooking costs, and operational disruptions."
                sourceUrl="https://finance.yahoo.com/news/much-money-air-canada-lose-140011375.html"
                sourceLabel="Yahoo Finance - Daily Impact Analysis"
              />
            </div>
            <div className="text-xl font-bold text-red-800 font-mono">
              {formatCurrency(liveLoss, true)}
            </div>
            <div className="text-xs text-red-600 mt-1">
              +{formatCurrency(lossPerSecond)}/sec
            </div>
          </div>
        </CardContent>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-200">
          <div className="h-full bg-red-400 animate-pulse"></div>
        </div>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 relative overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-sm font-medium text-red-700">Loss Per Flight Attendant</span>
              <InformativeTooltip
                title="Individual Impact"
                content="Strike cost divided by approximately 10,000 Air Canada flight attendants. This represents the theoretical cost allocated to each striking worker."
              />
            </div>
            <div className="text-xl font-bold text-red-800 font-mono">
              {formatCurrency(liveLossPerFA)}
            </div>
            <div className="text-xs text-red-600 mt-1">
              +{formatCurrency(lossPerSecondPerFA)}/sec
            </div>
          </div>
        </CardContent>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-200">
          <div className="h-full bg-red-400 animate-pulse"></div>
        </div>
      </Card>
    </div>
  );
};

export default LiveStrikeCostCounter;