import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateScenario, formatCurrency, formatNumber, DEFAULT_INPUTS, CONSTANTS, DATA_SOURCES, getCurrentStrikeDays, type CalculatorInputs } from '@/utils/calculatorLogic';
import { toast } from 'sonner';
import { Share2, Linkedin, TrendingUp, Clock, DollarSign, Users } from 'lucide-react';

const StorytellingCalculator: React.FC = () => {
  const { t } = useTranslation('calculator');
  
  const [inputs, setInputs] = useState<CalculatorInputs>(() => ({
    ...DEFAULT_INPUTS,
    strikeDays: getCurrentStrikeDays() // Use real-time strike duration
  }));
  
  const results = useMemo(() => calculateScenario(inputs), [inputs]);

  // Load from URL on mount and update strike days in real-time
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlInputs: Partial<CalculatorInputs> = {};
    
    const dailyCost = params.get('dailyStrikeCost');
    if (dailyCost) urlInputs.dailyStrikeCost = Number(dailyCost);
    
    const days = params.get('strikeDays');
    if (days) urlInputs.strikeDays = Number(days);
    else urlInputs.strikeDays = getCurrentStrikeDays(); // Use real-time if not in URL
    
    const unpaid = params.get('unpaidHoursPercent');
    if (unpaid) urlInputs.unpaidHoursPercent = Number(unpaid);
    
    const parity = params.get('useParityLock');
    if (parity) urlInputs.useParityLock = parity === 'true';

    const salary = params.get('salaryIncreasePercent');
    if (salary) urlInputs.salaryIncreasePercent = Number(salary);

    const contract = params.get('contractDurationYears');
    if (contract) urlInputs.contractDurationYears = Number(contract);

    setInputs(prev => ({ ...prev, ...urlInputs }));
  }, []);

  // Update strike days every minute to keep it current
  useEffect(() => {
    const interval = setInterval(() => {
      setInputs(prev => ({
        ...prev,
        strikeDays: getCurrentStrikeDays()
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const shareScenario = () => {
    const params = new URLSearchParams({
      dailyStrikeCost: inputs.dailyStrikeCost.toString(),
      strikeDays: inputs.strikeDays.toString(),
      unpaidHoursPercent: inputs.unpaidHoursPercent.toString(),
      useParityLock: inputs.useParityLock.toString(),
      salaryIncreasePercent: inputs.salaryIncreasePercent.toString(),
      contractDurationYears: inputs.contractDurationYears.toString(),
    });
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    toast.success('Scenario URL copied to clipboard!');
  };

  const applyPreset = (preset: 'conservative' | 'moderate' | 'union' | 'management') => {
    const presets = {
      conservative: { salaryIncreasePercent: 3, unpaidHoursPercent: 25, useParityLock: false, contractDurationYears: 5 },
      moderate: { salaryIncreasePercent: 8, unpaidHoursPercent: 50, useParityLock: false, contractDurationYears: 4 },
      union: { salaryIncreasePercent: 15, unpaidHoursPercent: 100, useParityLock: true, contractDurationYears: 3 },
      management: { salaryIncreasePercent: 2, unpaidHoursPercent: 0, useParityLock: false, contractDurationYears: 6 },
    };
    setInputs(prev => ({ ...prev, ...presets[preset] }));
    toast.success(`Applied ${preset} scenario`);
  };

  const getPressureColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getComparisonText = (unionAsk: number, strikeEquiv: number): string => {
    const ratio = unionAsk / strikeEquiv;
    if (ratio < 0.9) return 'much less';
    if (ratio < 1.1) return 'about the same';
    if (ratio < 2) return 'more';
    return 'much more';
  };

  const rateText = inputs.useParityLock ? 'parity' : 'base';

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header with branding */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              strikecost.ca
            </a>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with curiosity by</span>
              <a 
                href="http://linkedin.com/in/izzydoesizzy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Linkedin className="w-3 h-3" />
                Izzy Piyale-Sheard
              </a>
            </div>
          </div>
          <Button onClick={shareScenario} variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            {t('shareButton')}
          </Button>
        </div>

        {/* Title and subtitle */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Fixed Assumptions Banner */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4">{t('controls.fixedAssumptions.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              {t('controls.fixedAssumptions.flightAttendants', { count: CONSTANTS.FLIGHT_ATTENDANTS })}
            </div>
            <div>
              {t('controls.fixedAssumptions.unpaidHours', { hours: CONSTANTS.UNPAID_HOURS_PER_MONTH })}
            </div>
            <div>
              {t('controls.fixedAssumptions.dailyStrikeCost')}
            </div>
          </div>
        </div>

        {/* Current Strike Status */}
        <div className="text-center mb-8 p-6 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold mb-2">
            Strike Duration: {inputs.strikeDays} day{inputs.strikeDays !== 1 ? 's' : ''}
          </div>
          <div className="text-lg text-muted-foreground">
            Total Losses: {formatCurrency(results.totalStrikeLoss)}
          </div>
        </div>

        {/* Negotiation Scenario Builder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t('controls.negotiationParams.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="main" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="main">Settlement Terms</TabsTrigger>
                <TabsTrigger value="presets">Quick Scenarios</TabsTrigger>
              </TabsList>
              
              <TabsContent value="main" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Salary Increase Slider */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {t('controls.negotiationParams.salaryIncrease')}: {inputs.salaryIncreasePercent}%
                    </label>
                    <Slider
                      value={[inputs.salaryIncreasePercent]}
                      onValueChange={([value]) => setInputs(prev => ({ ...prev, salaryIncreasePercent: value }))}
                      min={0}
                      max={25}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0% (No increase)</span>
                      <span>8% (Moderate)</span>
                      <span>15% (Significant)</span>
                      <span>25% (Maximum)</span>
                    </div>
                  </div>

                  {/* Contract Duration */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {t('controls.negotiationParams.contractDuration')}: {inputs.contractDurationYears} years
                    </label>
                    <div className="flex gap-2">
                      {[2, 3, 4, 5, 6].map(years => (
                        <Button
                          key={years}
                          variant={inputs.contractDurationYears === years ? "default" : "outline"}
                          size="sm"
                          onClick={() => setInputs(prev => ({ ...prev, contractDurationYears: years }))}
                          className="flex-1"
                        >
                          {years}y
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Unpaid Work Coverage */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      {t('controls.negotiationParams.unpaidPercent')}: {inputs.unpaidHoursPercent}%
                    </label>
                    <div className="flex gap-2">
                      {[
                        { value: 0, label: t('controls.unpaidOptions.0percent') },
                        { value: 50, label: t('controls.unpaidOptions.50percent') },
                        { value: 100, label: t('controls.unpaidOptions.100percent') }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={inputs.unpaidHoursPercent === option.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setInputs(prev => ({ ...prev, unpaidHoursPercent: option.value }))}
                          className="flex-1 text-xs"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Parity Lock */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        {t('controls.negotiationParams.parityLock')}
                      </label>
                      <Switch
                        checked={inputs.useParityLock}
                        onCheckedChange={(checked) => setInputs(prev => ({ ...prev, useParityLock: checked }))}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t('controls.negotiationParams.parityLockDesc', { rate: formatNumber(CONSTANTS.PARITY_HOURLY, 2) })}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="presets" className="mt-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { key: 'conservative', label: t('controls.scenarioPresets.conservative') },
                    { key: 'moderate', label: t('controls.scenarioPresets.moderate') },
                    { key: 'union', label: t('controls.scenarioPresets.union') },
                    { key: 'management', label: t('controls.scenarioPresets.management') }
                  ].map(preset => (
                    <Button
                      key={preset.key}
                      variant="outline"
                      onClick={() => applyPreset(preset.key as any)}
                      className="text-sm h-auto py-3 px-4 text-center"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Negotiation Pressure Gauge */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t('cards.negotiationPressure.title')}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t('cards.negotiationPressure.subtitle')}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <Badge className={`text-lg px-4 py-2 ${getPressureColor(results.negotiationPressureLevel)}`}>
                    {t(`cards.negotiationPressure.pressureLevels.${results.negotiationPressureLevel}`)}
                  </Badge>
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  {t('cards.negotiationPressure.description', {
                    strikeCost: formatCurrency(results.totalStrikeLoss),
                    contractDuration: inputs.contractDurationYears,
                    settlementCost: formatCurrency(results.contractTotalValue)
                  })}
                </div>
                <div className="text-center font-semibold">
                  Settlement = {formatNumber(results.settlementEquivalentStrikeDays, 1)} strike days
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settlement Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {t('cards.settlementAnalysis.title')}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {t('cards.settlementAnalysis.subtitle')}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="font-medium">{t('cards.settlementAnalysis.currentSalary')}</div>
                    <div className="text-lg font-bold">{formatCurrency(results.currentAnnualSalary)}</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded">
                    <div className="font-medium">{t('cards.settlementAnalysis.newTotalSalary')}</div>
                    <div className="text-lg font-bold">{formatCurrency(results.newAnnualSalary)}</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t('cards.settlementAnalysis.salaryIncrease', { percent: inputs.salaryIncreasePercent })}</span>
                    <span className="font-medium">+{formatCurrency(results.currentAnnualSalary * inputs.salaryIncreasePercent / 100)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cards.settlementAnalysis.unpaidWork')}</span>
                    <span className="font-medium">+{formatCurrency(results.unionAskPerFAPerYear)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>{t('cards.settlementAnalysis.changePerFA')}</span>
                    <span>+{formatCurrency(results.salaryIncreasePerFA)}</span>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t('cards.settlementAnalysis.totalAnnualCost')}</span>
                    <span className="font-bold">{formatCurrency(results.totalSettlementCostPerYear)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cards.settlementAnalysis.contractValue', { duration: inputs.contractDurationYears })}</span>
                    <span className="font-bold">{formatCurrency(results.contractTotalValue)}</span>
                  </div>
                  <div className="text-center pt-2 border-t">
                    <span className="text-primary font-medium">
                      {t('cards.settlementAnalysis.strikeEquivalent', { days: formatNumber(results.settlementEquivalentStrikeDays, 1) })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Executive Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('cards.executiveSummary.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-lg">
                {t('cards.executiveSummary.comparison', {
                  strikeCost: formatCurrency(inputs.dailyStrikeCost, true),
                  days: inputs.strikeDays,
                  perFAAmount: formatCurrency(results.perFAStrikeEquivalent4Years),
                  comparison: getComparisonText(results.unionAskPerFAPerYear, results.perFAStrikeEquivalent4Years),
                  unpaidPercent: inputs.unpaidHoursPercent,
                  rate: rateText
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Strike Funding Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('narrative.strikeComparisonTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">
                {t('narrative.oneDayFunding', {
                  strikeCost: formatCurrency(inputs.dailyStrikeCost, true),
                  years: formatNumber(results.yearsFundedByOneStrikeDay, 1)
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sources */}
        <Card>
          <CardHeader>
            <CardTitle>{t('sources.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{t('sources.disclaimer')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA_SOURCES.map((source, index) => (
                <div key={index} className="text-sm">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {source.label}
                  </a>
                  <p className="text-muted-foreground">{source.context}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StorytellingCalculator;
