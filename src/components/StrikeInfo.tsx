import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceTooltip } from "@/components/SourceTooltip";
import { useTranslation } from "react-i18next";

const sources = {
  strikeDetails: {
    title: "Official Air Canada strike notice and operational impact details",
    url: "https://www.aircanada.com/ca/en/aco/home/book/travel-news-and-updates/2025/ac-action.html"
  },
  union: {
    title: "CUPE union official statement on strike action",
    url: "https://cupe.ca/air-canada-flight-attendants-forced-issue-strike-notice-end-unpaid-work"
  },
  negotiation: {
    title: "Air Canada's compensation offer and negotiation details",
    url: "https://www.aircanada.com/media/air-canada-declares-an-impasse-in-cupe-negotiations-as-midnight-threshold-for-a-strike-or-lockout-notice-nears/"
  },
  impact: {
    title: "CBC News: Daily impact and passenger numbers during strike",
    url: "https://www.cbc.ca/news/business/air-canada-flight-attendants-final-day-strike-1.7610225"
  },
  operations: {
    title: "Reuters: Operational status and affected services",
    url: "https://www.reuters.com/business/world-at-work/air-canada-flight-attendants-deadlocked-with-strike-looming-2025-08-15/"
  }
};

export function StrikeInfo() {
  const { t } = useTranslation('content');
  
  return (
    <div className="space-y-12">
      {/* Strike Overview */}
      <Card className="p-10 bg-gradient-to-br from-surface-elevated to-surface-subtle border border-border/30 shadow-large">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Badge variant="outline" className="border-primary-blue/20 text-primary-blue bg-primary-blue-light px-4 py-2 text-sm font-medium">
              {t('strikeInfo.labourDisruption')}
            </Badge>
            <h2 className="text-4xl font-light text-foreground tracking-tight">
              {t('strikeInfo.strikeTitle')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('strikeInfo.strikeDescription')}
            </p>
          </div>
        </div>
      </Card>

      {/* Key Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-medium transition-all duration-300">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-blue-light rounded-full flex items-center justify-center mx-auto">
              <div className="w-6 h-6 bg-primary-blue rounded-full"></div>
            </div>
            <div className="space-y-2">
              <SourceTooltip source={sources.impact}>
                <div className="text-3xl font-semibold text-foreground">130K</div>
              </SourceTooltip>
              <p className="text-sm text-muted-foreground">{t('strikeInfo.dailyAffectedPassengers')}</p>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-medium transition-all duration-300">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-blue-light rounded-full flex items-center justify-center mx-auto">
              <div className="w-6 h-6 bg-primary-blue rounded-full"></div>
            </div>
            <div className="space-y-2">
              <SourceTooltip source={sources.union}>
                <div className="text-3xl font-semibold text-foreground">10K</div>
              </SourceTooltip>
              <p className="text-sm text-muted-foreground">{t('strikeInfo.flightAttendantsOnStrike')}</p>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-medium transition-all duration-300">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-blue-light rounded-full flex items-center justify-center mx-auto">
              <div className="w-6 h-6 bg-primary-blue rounded-full"></div>
            </div>
            <div className="space-y-2">
              <SourceTooltip source={sources.impact}>
                <div className="text-3xl font-semibold text-foreground">500+</div>
              </SourceTooltip>
              <p className="text-sm text-muted-foreground">{t('strikeInfo.dailyFlightCancellations')}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 bg-surface-elevated border border-border/30 shadow-elegant">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">{t('strikeInfo.strikeTimeline')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start py-3 border-b border-border/20">
                <span className="text-muted-foreground font-medium">{t('strikeInfo.commencement')}</span>
                <SourceTooltip source={sources.strikeDetails}>
                  <div className="text-right">
                    <div className="text-foreground">August 16, 2025</div>
                    <div className="text-foreground">1:00 AM ET</div>
                  </div>
                </SourceTooltip>
              </div>
              <div className="flex justify-between items-start py-3 border-b border-border/20">
                <span className="text-muted-foreground font-medium">{t('strikeInfo.unionRep')}</span>
                <SourceTooltip source={sources.union}>
                  <span className="text-foreground">CUPE</span>
                </SourceTooltip>
              </div>
              <div className="flex justify-between items-start py-3 border-b border-border/20">
                <span className="text-muted-foreground font-medium">{t('strikeInfo.negotiationPeriod')}</span>
                <SourceTooltip source={sources.negotiation}>
                  <span className="text-foreground">8 months</span>
                </SourceTooltip>
              </div>
              <div className="flex justify-between items-start py-3">
                <span className="text-muted-foreground font-medium">{t('strikeInfo.windDownPeriod')}</span>
                <SourceTooltip source={sources.strikeDetails}>
                  <span className="text-foreground">72 hours</span>
                </SourceTooltip>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-surface-elevated border border-border/30 shadow-elegant">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">{t('strikeInfo.keyDisputeAreas')}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">{t('strikeInfo.companyOffer')}</h4>
                <SourceTooltip source={sources.negotiation}>
                  <p className="text-sm text-muted-foreground">{t('strikeInfo.companyOfferDetails')}</p>
                </SourceTooltip>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">{t('strikeInfo.primaryIssue')}</h4>
                <SourceTooltip source={sources.union}>
                  <p className="text-sm text-muted-foreground">{t('strikeInfo.primaryIssueDetails')}</p>
                </SourceTooltip>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">{t('strikeInfo.unionPosition')}</h4>
                <SourceTooltip source={sources.union}>
                  <p className="text-sm text-muted-foreground">{t('strikeInfo.unionPositionDetails')}</p>
                </SourceTooltip>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Operational Impact */}
      <Card className="p-8 bg-primary-blue-subtle border border-primary-blue/10 shadow-elegant">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground text-center">{t('strikeInfo.operationalImpact')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">{t('strikeInfo.affectedOps')}</h4>
              <div className="space-y-3">
                <SourceTooltip source={sources.operations}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{t('strikeInfo.airCanadaMainline')}</span>
                  </div>
                </SourceTooltip>
                <SourceTooltip source={sources.operations}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{t('strikeInfo.airCanadaRouge')}</span>
                  </div>
                </SourceTooltip>
                <SourceTooltip source={sources.strikeDetails}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{t('strikeInfo.customerRebooking')}</span>
                  </div>
                </SourceTooltip>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">{t('strikeInfo.continuingServices')}</h4>
              <div className="space-y-3">
                <SourceTooltip source={sources.operations}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{t('strikeInfo.airCanadaExpress')}</span>
                  </div>
                </SourceTooltip>
                <SourceTooltip source={sources.operations}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{t('strikeInfo.palAirlines')}</span>
                  </div>
                </SourceTooltip>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{t('strikeInfo.cargoServices')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}