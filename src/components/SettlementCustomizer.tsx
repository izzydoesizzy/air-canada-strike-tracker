import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import InformativeTooltip from './InformativeTooltip';
import { Settings } from 'lucide-react';

interface SettlementCustomizerProps {
  salaryIncreasePercent: number;
  unpaidHoursPercent: number;
  contractDurationYears: number;
  useParityLock: boolean;
  onSalaryIncreaseChange: (value: number) => void;
  onUnpaidHoursChange: (value: number) => void;
  onContractDurationChange: (value: number) => void;
  onParityLockChange: (value: boolean) => void;
}

const SettlementCustomizer: React.FC<SettlementCustomizerProps> = ({
  salaryIncreasePercent,
  unpaidHoursPercent,
  contractDurationYears,
  useParityLock,
  onSalaryIncreaseChange,
  onUnpaidHoursChange,
  onContractDurationChange,
  onParityLockChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Custom Settlement Builder
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust parameters to create your own settlement scenario
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Salary Increase */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="font-medium">Salary Increase</Label>
            <InformativeTooltip
              title="Base Salary Increase"
              content="Percentage increase to current base salary of approximately $52,000 CAD annually. This is separate from unpaid work compensation."
            />
          </div>
          <div className="px-3">
            <Slider
              value={[salaryIncreasePercent]}
              onValueChange={(value) => onSalaryIncreaseChange(value[0])}
              max={25}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>0%</span>
              <span className="font-medium">{salaryIncreasePercent}%</span>
              <span>25%</span>
            </div>
          </div>
        </div>

        {/* Unpaid Work Coverage */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="font-medium">Unpaid Work Coverage</Label>
            <InformativeTooltip
              title="Unpaid Work Compensation"
              content="Flight attendants currently work 35 hours per month (420 hours annually) of unpaid time including boarding, safety checks, and delays. This slider determines what percentage gets compensated."
              sourceUrl="https://unpaidworkwontfly.ca/"
              sourceLabel="CUPE - Unpaid Work Campaign"
            />
          </div>
          <div className="px-3">
            <Slider
              value={[unpaidHoursPercent]}
              onValueChange={(value) => onUnpaidHoursChange(value[0])}
              max={100}
              min={0}
              step={25}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>0%</span>
              <span className="font-medium">{unpaidHoursPercent}%</span>
              <span>100%</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {unpaidHoursPercent === 0 && "No compensation for unpaid work"}
              {unpaidHoursPercent === 25 && "Minimal coverage (boarding only)"}
              {unpaidHoursPercent === 50 && "Current Air Canada offer"}
              {unpaidHoursPercent === 75 && "Most unpaid work covered"}
              {unpaidHoursPercent === 100 && "Full compensation for all unpaid work"}
            </div>
          </div>
        </div>

        {/* Contract Duration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="font-medium">Contract Duration</Label>
            <InformativeTooltip
              title="Contract Length Impact"
              content="Longer contracts spread costs over more years, reducing annual impact but increasing total commitment. Shorter contracts allow for more frequent renegotiation."
            />
          </div>
          <div className="px-3">
            <Slider
              value={[contractDurationYears]}
              onValueChange={(value) => onContractDurationChange(value[0])}
              max={6}
              min={2}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>2 years</span>
              <span className="font-medium">{contractDurationYears} years</span>
              <span>6 years</span>
            </div>
          </div>
        </div>

        {/* Parity Lock */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="font-medium">Hourly Rate Parity</Label>
              <InformativeTooltip
                title="Parity with Air Transat"
                content="Air Transat flight attendants currently earn $40.38/hour - the highest in the Canadian airline industry. Air Canada FAs currently earn approximately $30/hour base rate."
                sourceUrl="https://cupe.ca/air-transat-flight-attendants-now-highest-paid-industry"
                sourceLabel="CUPE - Industry Comparison"
              />
            </div>
            <Switch
              checked={useParityLock}
              onCheckedChange={onParityLockChange}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {useParityLock 
              ? "Using Air Transat parity rate ($40.38/hour)" 
              : "Using current base rate ($30/hour)"
            }
          </div>
        </div>

        {/* Summary */}
        <div className="bg-muted/30 p-4 rounded-lg space-y-2">
          <div className="font-medium text-sm">Quick Summary</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Salary:</span>
              <span className="ml-2 font-medium">+{salaryIncreasePercent}%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Unpaid work:</span>
              <span className="ml-2 font-medium">{unpaidHoursPercent}%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <span className="ml-2 font-medium">{contractDurationYears} years</span>
            </div>
            <div>
              <span className="text-muted-foreground">Rate:</span>
              <span className="ml-2 font-medium">{useParityLock ? 'Parity' : 'Current'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettlementCustomizer;