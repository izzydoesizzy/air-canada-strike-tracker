import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { calculateScenario, formatCurrency, formatNumber, DEFAULT_INPUTS, CONSTANTS, DATA_SOURCES, type CalculatorInputs } from '@/utils/calculatorLogic';
import { toast } from 'sonner';
import { Share2 } from 'lucide-react';

const StorytellingCalculator: React.FC = () => {
  const { t } = useTranslation('calculator');
  
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  
  const results = useMemo(() => calculateScenario(inputs), [inputs]);

  // Load from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlInputs: Partial<CalculatorInputs> = {};
    
    const dailyCost = params.get('dailyStrikeCost');
    if (dailyCost) urlInputs.dailyStrikeCost = Number(dailyCost);
    
    const days = params.get('strikeDays');
    if (days) urlInputs.strikeDays = Number(days);
    
    const unpaid = params.get('unpaidHoursPercent');
    if (unpaid) urlInputs.unpaidHoursPercent = Number(unpaid);
    
    const parity = params.get('useParityLock');
    if (parity) urlInputs.useParityLock = parity === 'true';

    if (Object.keys(urlInputs).length > 0) {
      setInputs(prev => ({ ...prev, ...urlInputs }));
    }
  }, []);

  const shareScenario = () => {
    const params = new URLSearchParams({
      dailyStrikeCost: inputs.dailyStrikeCost.toString(),
      strikeDays: inputs.strikeDays.toString(),
      unpaidHoursPercent: inputs.unpaidHoursPercent.toString(),
      useParityLock: inputs.useParityLock.toString(),
    });
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    toast.success('Scenario URL copied to clipboard!');
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Fixed Assumptions Banner */}
        <div className="mb-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">{t('controls.fixedAssumptions.title')}</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{t('controls.fixedAssumptions.flightAttendants', { count: CONSTANTS.FLIGHT_ATTENDANTS })}</p>
            <p>{t('controls.fixedAssumptions.unpaidHours', { hours: CONSTANTS.UNPAID_HOURS_PER_MONTH })}</p>
          </div>
        </div>

        {/* Main Calculator Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Card 1: Strike Loss Counter */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('cards.strikeLoss.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {t('cards.strikeLoss.totalLoss', { 
                    amount: formatCurrency(results.totalStrikeLoss),
                    days: inputs.strikeDays 
                  })}
                </div>
                {inputs.strikeDays === 3 && (
                  <Badge variant="secondary" className="mb-4">
                    {t('cards.strikeLoss.tdEstimate', { amount: formatCurrency(300000000) })}
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('controls.adjustableParams.strikeCost')}
                  </label>
                  <Slider
                    value={[inputs.dailyStrikeCost]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, dailyStrikeCost: value }))}
                    min={50000000}
                    max={120000000}
                    step={5000000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$50M</span>
                    <span>$60M (Revenue)</span>
                    <span>$75M (EBITDA)</span>
                    <span>$120M</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('cards.strikeLoss.perDay', { amount: formatCurrency(inputs.dailyStrikeCost) })}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('controls.adjustableParams.strikeDays')}
                  </label>
                  <div className="flex gap-2 mb-2">
                    {[1, 3, 7, 14].map(days => (
                      <Button
                        key={days}
                        variant={inputs.strikeDays === days ? "default" : "outline"}
                        size="sm"
                        onClick={() => setInputs(prev => ({ ...prev, strikeDays: days }))}
                      >
                        {t(`controls.strikeDaysPresets.${days}${days === 1 ? 'day' : 'days'}`)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {t('cards.strikeLoss.analystBand')}
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Per-FA Strike Equivalents */}
          <Card>
            <CardHeader>
              <CardTitle>{t('cards.perFAEquivalents.title')}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {t('cards.perFAEquivalents.subtitle', { count: CONSTANTS.FLIGHT_ATTENDANTS })}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-lg font-bold">{formatCurrency(results.perFAStrikeEquivalent1Year, true)}</div>
                    <div className="text-xs text-muted-foreground">1 Year</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-lg font-bold">{formatCurrency(results.perFAStrikeEquivalent4Years, true)}</div>
                    <div className="text-xs text-muted-foreground">4 Years</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-lg font-bold">{formatCurrency(results.perFAStrikeEquivalent10Years, true)}</div>
                    <div className="text-xs text-muted-foreground">10 Years</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('cards.perFAEquivalents.description', {
                    amount1year: formatCurrency(results.perFAStrikeEquivalent1Year),
                    amount4years: formatCurrency(results.perFAStrikeEquivalent4Years),
                    amount10years: formatCurrency(results.perFAStrikeEquivalent10Years)
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Union Ask vs Strike */}
          <Card>
            <CardHeader>
              <CardTitle>{t('cards.unionAsk.title')}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {t('cards.unionAsk.subtitle')}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  {t('cards.unionAsk.unionAskAmount', { amount: formatCurrency(results.unionAskPerFAPerYear) })}
                </div>
                <p className="text-sm text-muted-foreground">
                  {getComparisonText(results.unionAskPerFAPerYear, results.perFAStrikeEquivalent4Years)} than strike equivalent over 4 years
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('controls.adjustableParams.unpaidPercent')}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 50, 100].map(percent => (
                      <Button
                        key={percent}
                        variant={inputs.unpaidHoursPercent === percent ? "default" : "outline"}
                        size="sm"
                        onClick={() => setInputs(prev => ({ ...prev, unpaidHoursPercent: percent }))}
                        className="text-xs"
                      >
                        {t(`controls.unpaidOptions.${percent}percent`)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      {t('controls.adjustableParams.parityLock')}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {t('controls.adjustableParams.parityLockDesc', { rate: formatNumber(CONSTANTS.PARITY_HOURLY, 2) })}
                    </p>
                  </div>
                  <Switch
                    checked={inputs.useParityLock}
                    onCheckedChange={(checked) => setInputs(prev => ({ ...prev, useParityLock: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card 4: Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('cards.executiveSummary.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-center">
              {t('cards.executiveSummary.comparison', {
                strikeCost: formatCurrency(inputs.dailyStrikeCost),
                days: inputs.strikeDays,
                perFAAmount: formatCurrency(results.perFAStrikeEquivalent4Years),
                comparison: getComparisonText(results.unionAskPerFAPerYear, results.perFAStrikeEquivalent4Years),
                unpaidPercent: `${inputs.unpaidHoursPercent}%`,
                rate: rateText
              })}
            </div>
          </CardContent>
        </Card>

        {/* Strike Funding Headline */}
        <div className="text-center mb-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-lg font-medium">
            {t('narrative.oneDayFunding', {
              strikeCost: formatCurrency(inputs.dailyStrikeCost),
              years: formatNumber(results.yearsFundedByOneStrikeDay, 2)
            })}
          </p>
        </div>

        {/* Share Button */}
        <div className="text-center mb-8">
          <Button onClick={shareScenario} variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            {t('shareButton')}
          </Button>
        </div>

        {/* Sources */}
        <Card>
          <CardHeader>
            <CardTitle>{t('sources.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DATA_SOURCES.map((source, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{source.label}</span>
                  <br />
                  <span className="text-muted-foreground">{source.context}</span>
                  <br />
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs"
                  >
                    View Source
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">{t('sources.disclaimer')}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StorytellingCalculator;