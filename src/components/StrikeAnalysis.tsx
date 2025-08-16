import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Briefcase } from "lucide-react";
import { SourceTooltip } from "@/components/SourceTooltip";
import { useTranslation } from "react-i18next";

const sources = {
  cupe: {
    title: "CUPE 4092 represents flight attendants",
    url: "https://cupe.ca/air-canada-flight-attendants-serve-72-hour-strike-notice"
  },
  negotiations: {
    title: "Labour negotiations and strike announcement",
    url: "https://www.aircanada.com/media/air-canada-receives-72-hour-strike-notice-from-cupe-and-issues-lockout-notice-in-response/"
  },
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

export function StrikeAnalysis() {
  const { t } = useTranslation('content');
  
  return (
    <section id="analysis" className="py-20 bg-background">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-display-medium font-light text-foreground tracking-tight">
              {t('strikeOverview.title')}
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {t('strikeOverview.description')}
            </p>
          </div>

          {/* Strike Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Key Details */}
            <Card className="bg-surface-elevated border-border/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Briefcase className="h-5 w-5" />
                  <span>{t('strikeOverview.strikeDetails')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('strikeOverview.union')}</span>
                  <SourceTooltip source={sources.cupe}>
                    <Badge variant="outline">CUPE 4092</Badge>
                  </SourceTooltip>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('strikeOverview.affectedWorkers')}</span>
                  <span className="font-mono font-medium">10,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('strikeOverview.strikeNotice')}</span>
                  <span className="text-sm">72 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('strikeOverview.status')}</span>
                  <Badge variant="destructive">Active Strike</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-surface-elevated border-border/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  <span>{t('strikeOverview.timeline')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm font-medium">{t('strikeOverview.strikeNoticeIssued')}</div>
                      <div className="text-xs text-muted-foreground">August 13, 2025</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-loss-indicator rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <SourceTooltip source={sources.negotiations}>
                        <div className="text-sm font-medium">{t('strikeOverview.strikeCommenced')}</div>
                      </SourceTooltip>
                      <div className="text-xs text-muted-foreground">August 16, 2025 - 1:00 AM ET</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm font-medium">Ongoing Negotiations</div>
                      <div className="text-xs text-muted-foreground">Status pending</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Summary */}
          <Card className="bg-gradient-to-r from-primary-blue/5 to-transparent border-border/30">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-primary-blue" />
                  <div>
                    <div className="text-lg font-mono font-semibold">130,000</div>
                    <div className="text-sm text-muted-foreground">{t('strikeOverview.affectedPassengers')}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-8 w-8 text-primary-blue" />
                  <div>
                    <div className="text-lg font-mono font-semibold">80+</div>
                    <div className="text-sm text-muted-foreground">{t('strikeOverview.affectedDestinations')}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-8 w-8 text-primary-blue" />
                  <div>
                    <div className="text-lg font-mono font-semibold">10,000+</div>
                    <div className="text-sm text-muted-foreground">{t('strikeOverview.strikingAttendants')}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="space-y-12">
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
        </div>
      </div>
    </section>
  );
}