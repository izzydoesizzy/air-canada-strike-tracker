import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SourceTooltip } from "@/components/SourceTooltip";
import { Clock, Users, DollarSign, AlertTriangle, Timer } from "lucide-react";
import { useTranslation } from "react-i18next";

const sources = {
  cupeNotice: {
    title: "CUPE Strike Notice - Unpaid Work and Wage Stagnation",
    url: "https://cupe.ca/air-canada-flight-attendants-forced-issue-strike-notice-end-unpaid-work"
  },
  airCanadaOffer: {
    title: "Air Canada's Official Compensation Offer Details",
    url: "https://www.aircanada.com/media/air-canada-provides-clarity-on-its-offer-to-cupe/"
  },
  cnbcCoverage: {
    title: "CNBC Strike Impact Coverage",
    url: "https://www.cnbc.com/2025/08/15/air-canada-flight-attendant-strike-looms.html"
  }
};

export function TheStrikeStory() {
  const { t } = useTranslation('content');
  const highlights = t('storyHighlights.highlights', { returnObjects: true }) as string[];
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let index = 0;
          const interval = setInterval(() => {
            setVisibleIndex(index);
            index++;
            if (index >= highlights.length) {
              clearInterval(interval);
            }
          }, 800);
        }
      });
    }, {
      threshold: 0.3
    });

    const element = document.getElementById('story');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [highlights.length]);
  
  return (
    <section id="story" className="bg-gradient-to-b from-surface-subtle to-background py-20">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Story Introduction */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-display-large font-light text-foreground">
                {t('storyIntroduction.title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('storyIntroduction.subtitle')}
              </p>
            </div>

            {/* Story Timeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 border-l-4 border-l-amber-500 bg-surface-elevated">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('storyIntroduction.nearlyDecade')}</h3>
                    <p className="text-sm text-muted-foreground">
                      <SourceTooltip source={sources.cupeNotice}>
                        <span className="underline decoration-dotted">{t('storyIntroduction.nearlyDecadeDesc')}</span>
                      </SourceTooltip>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-primary-blue bg-surface-elevated">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-primary-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('storyIntroduction.increaseOffered')}</h3>
                    <p className="text-sm text-muted-foreground">
                      <SourceTooltip source={sources.airCanadaOffer}>
                        <span className="underline decoration-dotted">{t('storyIntroduction.increaseOfferedDesc')}</span>
                      </SourceTooltip>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-red-500 bg-surface-elevated">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('storyIntroduction.unionRejection')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('storyIntroduction.unionRejectionDesc')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-loss-red bg-surface-elevated">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-loss-red mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{t('storyIntroduction.dailyLoss')}</h3>
                    <p className="text-sm text-muted-foreground">
                      <SourceTooltip source={sources.cnbcCoverage}>
                        <span className="underline decoration-dotted">{t('storyIntroduction.strikeCostsExceed')}</span>
                      </SourceTooltip> {t('storyIntroduction.dailyLossDesc')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Unpaid Hours Crisis */}
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Timer className="h-8 w-8 text-amber-500 mt-1 flex-shrink-0" />
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">{t('unpaidHours.title')}</h2>
                        <p className="text-muted-foreground">{t('unpaidHours.description')}</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">{t('unpaidHours.whatIsUnpaid')}</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {(t('unpaidHours.unpaidDuties', { returnObjects: true }) as string[]).map((duty, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                                <span>{duty}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">{t('unpaidHours.impactTitle')}</h3>
                            <p className="text-sm text-muted-foreground">{t('unpaidHours.impactDescription')}</p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">{t('unpaidHours.safetyTitle')}</h3>
                            <p className="text-sm text-muted-foreground">{t('unpaidHours.safetyDescription')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                        <p className="text-sm font-medium text-foreground">
                          💡 {t('unpaidHours.financialImpact')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Key Insight */}
            <div className="text-center">
              <Card className="p-8 bg-gradient-to-r from-loss-red/10 to-amber-500/10 border border-loss-red/20">
                <div className="max-w-2xl mx-auto space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">{t('storyIntroduction.financialAbsurdity')}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('storyIntroduction.financialAbsurdityDesc')}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Story Highlights */}
          <div className="space-y-8">
            <Card className="p-12 bg-gradient-to-br from-loss-indicator/5 to-accent-blue/5 border border-loss-indicator/20 shadow-large">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-display-small font-semibold text-foreground mb-4">{t('storyHighlights.lookingAtNumbers')}</h2>
                  <p className="text-muted-foreground text-lg">
                    {t('storyHighlights.numbersStory')}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {highlights.map((highlight, index) => (
                    <div 
                      key={index} 
                      className={`transform transition-all duration-700 ${
                        index <= visibleIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`} 
                      style={{
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          index <= visibleIndex 
                            ? 'border-loss-indicator bg-loss-indicator text-primary-foreground' 
                            : 'border-border bg-background text-muted-foreground'
                        }`}>
                          <span className="text-sm font-semibold">{index + 1}</span>
                        </div>
                        <p className="text-lg font-medium text-foreground leading-relaxed">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}