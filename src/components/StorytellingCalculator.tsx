import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Share2 } from 'lucide-react';
import { 
  calculateScenario, 
  formatCurrency, 
  formatNumber,
  CONSTANTS,
  PRESETS,
  DATA_SOURCES,
  type CalculatorInputs,
  type CalculatorResults 
} from '@/utils/calculatorLogic';
import { CalculatorCharts } from './CalculatorCharts';

export const StorytellingCalculator: React.FC = () => {
  const { t } = useTranslation('calculator');
  
  // State for all calculator inputs
  const [inputs, setInputs] = useState<CalculatorInputs>({
    paidHoursPerMonth: 80,
    baseHourlyWage: 30,
    wageIncreasePercent: 0,
    unpaidHoursPercent: 0,
    dailyStrikeCost: 100000000, // 100M default
    timeHorizonYears: 1,
    npvDiscountRate: 5,
    parityLockEnabled: false
  });

  const [useNPV, setUseNPV] = useState(false);
  
  // Calculate results whenever inputs change
  const results: CalculatorResults = useMemo(() => {
    return calculateScenario(inputs);
  }, [inputs]);

  // Handle preset selection
  const applyPreset = (presetKey: keyof typeof PRESETS) => {
    const preset = PRESETS[presetKey];
    setInputs(prev => ({
      ...prev,
      ...preset
    }));
  };

  // Handle time horizon quick buttons
  const setTimeHorizon = (years: number) => {
    setInputs(prev => ({ ...prev, timeHorizonYears: years }));
  };

  // Handle share functionality
  const shareScenario = () => {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      params.set(key, value.toString());
    });
    params.set('useNPV', useNPV.toString());
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    // Could show toast notification here
  };

  // Load from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newInputs = { ...inputs };
    let hasParams = false;

    Object.keys(inputs).forEach(key => {
      const value = params.get(key);
      if (value !== null) {
        hasParams = true;
        if (key === 'parityLockEnabled') {
          (newInputs as any)[key] = value === 'true';
        } else {
          (newInputs as any)[key] = parseFloat(value);
        }
      }
    });

    const npvParam = params.get('useNPV');
    if (npvParam !== null) {
      setUseNPV(npvParam === 'true');
    }

    if (hasParams) {
      setInputs(newInputs);
    }
  }, []);

  const effectiveBaseWage = inputs.parityLockEnabled ? CONSTANTS.PARITY_BENCHMARK_WAGE : inputs.baseHourlyWage;

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Controls and KPIs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Presets */}
            <Card>
              <CardHeader>
                <CardTitle>{t('controls.presets.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(PRESETS).map(([key, preset]) => (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(key as keyof typeof PRESETS)}
                      className="text-xs"
                    >
                      {t(`controls.presets.${key}`)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fixed Assumptions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('controls.fixedAssumptions.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t('controls.fixedAssumptions.flightAttendants', { count: CONSTANTS.FLIGHT_ATTENDANTS })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t('controls.fixedAssumptions.unpaidHours', { hours: CONSTANTS.UNPAID_HOURS_PER_MONTH })}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Adjustable Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>{t('controls.adjustableParams.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Parity Lock Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t('controls.adjustableParams.parityLock', { rate: formatNumber(CONSTANTS.PARITY_BENCHMARK_WAGE) })}
                  </label>
                  <Switch
                    checked={inputs.parityLockEnabled}
                    onCheckedChange={(checked) => setInputs(prev => ({ ...prev, parityLockEnabled: checked }))}
                  />
                </div>

                {/* Paid Hours Per Month */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">{t('controls.adjustableParams.paidHours')}</label>
                    <span className="text-sm text-muted-foreground">{inputs.paidHoursPerMonth}</span>
                  </div>
                  <Slider
                    value={[inputs.paidHoursPerMonth]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, paidHoursPerMonth: value }))}
                    min={60}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Base Hourly Wage */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">{t('controls.adjustableParams.baseWage')}</label>
                    <span className="text-sm text-muted-foreground">
                      {inputs.parityLockEnabled ? (
                        <Badge variant="secondary">{formatCurrency(CONSTANTS.PARITY_BENCHMARK_WAGE)}</Badge>
                      ) : (
                        formatCurrency(inputs.baseHourlyWage)
                      )}
                    </span>
                  </div>
                  {!inputs.parityLockEnabled && (
                    <Slider
                      value={[inputs.baseHourlyWage]}
                      onValueChange={([value]) => setInputs(prev => ({ ...prev, baseHourlyWage: value }))}
                      min={20}
                      max={60}
                      step={1}
                      className="w-full"
                    />
                  )}
                </div>

                {/* Wage Increase */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">{t('controls.adjustableParams.wageIncrease')}</label>
                    <span className="text-sm text-muted-foreground">{inputs.wageIncreasePercent}%</span>
                  </div>
                  <Slider
                    value={[inputs.wageIncreasePercent]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, wageIncreasePercent: value }))}
                    min={0}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Unpaid Hours Percent */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">{t('controls.adjustableParams.unpaidPercent')}</label>
                    <span className="text-sm text-muted-foreground">{inputs.unpaidHoursPercent}%</span>
                  </div>
                  <Slider
                    value={[inputs.unpaidHoursPercent]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, unpaidHoursPercent: value }))}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Daily Strike Cost */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">{t('controls.adjustableParams.strikeCost')}</label>
                    <span className="text-sm text-muted-foreground">{formatCurrency(inputs.dailyStrikeCost, true)}</span>
                  </div>
                  <Slider
                    value={[inputs.dailyStrikeCost]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, dailyStrikeCost: value }))}
                    min={50000000}
                    max={120000000}
                    step={5000000}
                    className="w-full"
                  />
                </div>

                {/* Time Horizon */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">{t('controls.adjustableParams.timeHorizon')}</label>
                    <span className="text-sm text-muted-foreground">{inputs.timeHorizonYears} years</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    {[1, 4, 10].map(years => (
                      <Button
                        key={years}
                        variant={inputs.timeHorizonYears === years ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeHorizon(years)}
                      >
                        {t(`controls.quickButtons.${years}year${years > 1 ? 's' : ''}`)}
                      </Button>
                    ))}
                  </div>
                  <Slider
                    value={[inputs.timeHorizonYears]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, timeHorizonYears: value }))}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* NPV Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{t('controls.adjustableParams.npvToggle')}</label>
                    <Switch
                      checked={useNPV}
                      onCheckedChange={setUseNPV}
                    />
                  </div>
                  
                  {useNPV && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">{t('controls.adjustableParams.npvRate')}</label>
                        <span className="text-sm text-muted-foreground">{inputs.npvDiscountRate}%</span>
                      </div>
                      <Slider
                        value={[inputs.npvDiscountRate]}
                        onValueChange={([value]) => setInputs(prev => ({ ...prev, npvDiscountRate: value }))}
                        min={0}
                        max={15}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Key Performance Indicators */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{formatCurrency(results.currentAnnualPay)}</div>
                    <div className="text-xs text-muted-foreground">{t('kpis.currentAnnual')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{formatCurrency(results.scenarioAnnualPay)}</div>
                    <div className="text-xs text-muted-foreground">{t('kpis.scenarioAnnual')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(results.deltaPerFA)}</div>
                    <div className="text-xs text-muted-foreground">{t('kpis.changePerFA')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(results.addedAnnualCost, true)}</div>
                    <div className="text-xs text-muted-foreground">{t('kpis.addedAnnualCost')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visualizations */}
            <CalculatorCharts results={results} inputs={inputs} useNPV={useNPV} />

            {/* Share Button */}
            <div className="flex justify-center">
              <Button onClick={shareScenario} className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                {t('shareButton')}
              </Button>
            </div>
          </div>

          {/* Right Column: Narratives and Sources */}
          <div className="space-y-6">
            {/* Dynamic Narratives */}
            <Card>
              <CardHeader>
                <CardTitle>{t('narrative.perFATitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>{t('narrative.currentPay', { amount: formatCurrency(results.currentAnnualPay) })}</p>
                <p>{t('narrative.unpaidValue', { amount: formatCurrency(results.unpaidValueAtCurrent) })}</p>
                <p>{t('narrative.scenarioPay', { 
                  amount: formatCurrency(results.scenarioAnnualPay),
                  percent: formatNumber(results.percentIncrease, 1)
                })}</p>
                <p className="font-medium text-green-600">
                  {t('narrative.change', { amount: formatCurrency(results.deltaPerFA) })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('narrative.strikeComparisonTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>{t('narrative.oneDayFunding', {
                  strikeCost: formatCurrency(inputs.dailyStrikeCost, true),
                  years: formatNumber(results.yearsFundedByOneStrikeDay, 1)
                })}</p>
                <p>{t('narrative.settlementEquivalent', {
                  annualCost: formatCurrency(results.addedAnnualCost, true),
                  days: formatNumber(results.strikeDaysEquivForOneYear, 1)
                })}</p>
                <p>{t('narrative.multiYear', {
                  years: inputs.timeHorizonYears,
                  settlement: formatCurrency(results.settlementTotal, true),
                  npv: formatCurrency(useNPV ? results.settlementNPV : results.settlementTotal, true),
                  strikeBurn: formatCurrency(results.strikeBurnTotal, true)
                })}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-sm italic text-muted-foreground">
                  {t('narrative.caption', { amount: formatCurrency(results.unpaidValueAtScenario) })}
                </p>
              </CardContent>
            </Card>

            {/* Sources and Assumptions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('sources.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {DATA_SOURCES.map((source, index) => (
                  <div key={index} className="text-xs">
                    <a 
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                    >
                      {source.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
                <Separator className="my-3" />
                <p className="text-xs text-muted-foreground italic">
                  {t('sources.disclaimer')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};