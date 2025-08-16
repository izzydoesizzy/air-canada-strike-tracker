import { Card } from "@/components/ui/card";
import { SourceTooltip } from "@/components/SourceTooltip";
import { Clock, Users, DollarSign, AlertTriangle } from "lucide-react";
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

export function StoryIntroduction() {
  const { t } = useTranslation('content');
  
  return (
    <section id="story" className="bg-gradient-to-b from-surface-subtle to-background py-20">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-display-large font-light text-foreground">
              {t('storyIntroduction.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('storyIntroduction.subtitle')}
            </p>
          </div>

          {/* Story Timeline */}
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
      </div>
    </section>
  );
}