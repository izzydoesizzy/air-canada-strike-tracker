import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Sources() {
  const { t } = useTranslation('content');
  
  const sources = [
    {
      title: "Air Canada flight attendants officially begin strike",
      description: "Breaking news coverage of the official strike commencement at 12:58 AM ET, flight cancellations, and passenger impacts.",
      url: "https://www.ctvnews.ca/business/article/air-canada-flight-attendants-officially-begin-strike/",
      type: t('sources.sourceTypes.breakingNews'),
      organization: "CTV News"
    },
    {
      title: "Air Canada suspends operations as flight attendants go on strike",
      description: "CBC News coverage of the strike beginning, operational suspensions, and government response to the labour dispute.",
      url: "https://www.cbc.ca/news/politics/air-canada-flight-attendants-strike-1.7610891",
      type: t('sources.sourceTypes.breakingNews'),
      organization: "CBC News"
    },
    {
      title: "Air Canada flight attendants on strike, airline's flights cancelled",
      description: "Global News coverage of the strike impact, passenger stranding, and operational challenges across Canada.",
      url: "https://globalnews.ca/news/11337522/air-canada-flight-attendants/",
      type: t('sources.sourceTypes.breakingNews'),
      organization: "Global News"
    },
    {
      title: "Air Canada Receives 72-Hour Strike Notice from CUPE and Issues Lockout Notice",
      description: "Official Air Canada press release detailing the strike notice and company response, including compensation offer details and operational impact.",
      url: "https://www.aircanada.com/media/air-canada-receives-72-hour-strike-notice-from-cupe-and-issues-lockout-notice-in-response/",
      type: t('sources.sourceTypes.official'),
      organization: "Air Canada"
    },
    {
      title: "Labour disruption by Air Canada flight attendants",
      description: "Air Canada's customer advisory on strike operations, including rebooking policies and operational wind-down timeline.",
      url: "https://www.aircanada.com/ca/en/aco/home/book/travel-news-and-updates/2025/ac-action.html",
      type: t('sources.sourceTypes.advisory'),
      organization: "Air Canada"
    },
    {
      title: "Air Canada Declares an Impasse in CUPE Negotiations",
      description: "Official statement on failed negotiations and arbitration efforts, detailing the 38% compensation offer and union position.",
      url: "https://www.aircanada.com/media/air-canada-declares-an-impasse-in-cupe-negotiations-as-midnight-threshold-for-a-strike-or-lockout-notice-nears/",
      type: t('sources.sourceTypes.official'),
      organization: "Air Canada"
    },
    {
      title: "Air Canada flight attendants forced to issue strike notice to end unpaid work",
      description: "CUPE union's official position on the strike, highlighting ground pay disputes and wage increase demands.",
      url: "https://cupe.ca/air-canada-flight-attendants-forced-issue-strike-notice-end-unpaid-work",
      type: t('sources.sourceTypes.union'),
      organization: "CUPE"
    },
    {
      title: "Jobs minister says it's 'critical' for Air Canada, union to keep negotiating",
      description: "CBC News coverage of government involvement and federal mediation efforts in the dispute.",
      url: "https://www.cbc.ca/news/business/air-canada-flight-attendants-final-day-strike-1.7610225",
      type: t('sources.sourceTypes.news'),
      organization: "CBC News"
    },
    {
      title: "Air Canada, flight attendants deadlocked with strike looming",
      description: "Reuters analysis of the deadlock situation, passenger impact numbers, and Toronto Pearson Airport effects.",
      url: "https://www.reuters.com/business/world-at-work/air-canada-flight-attendants-deadlocked-with-strike-looming-2025-08-15/",
      type: t('sources.sourceTypes.analysis'),
      organization: "Reuters"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-surface-elevated to-surface-subtle">
      <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-light text-foreground tracking-tight">{t('sources.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('sources.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {sources.map((source, index) => (
            <Card key={index} className="p-6 bg-surface-elevated border border-border/20 shadow-elegant hover:shadow-medium transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-primary-blue-light text-primary-blue font-medium border border-primary-blue/20">
                        {source.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {source.organization}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary-blue transition-colors">
                      {source.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {source.description}
                    </p>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-3 rounded-full hover:bg-primary-blue-light transition-all duration-200 group-hover:scale-110"
                    aria-label="Open source link"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary-blue transition-colors" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-primary-blue-subtle border border-primary-blue/10">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">{t('sources.methodologyTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p><span className="font-medium text-foreground">{t('sources.lossEstimation')}:</span> {t('sources.lossEstimationDesc')}</p>
                <p><span className="font-medium text-foreground">{t('sources.perAttendantImpact')}:</span> {t('sources.perAttendantImpactDesc')}</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium text-foreground">{t('sources.strikeTimelineCalc')}:</span> {t('sources.strikeTimelineCalcDesc')}</p>
                <p><span className="font-medium text-foreground">{t('sources.realTimeUpdates')}:</span> {t('sources.realTimeUpdatesDesc')}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-surface-subtle border border-border/30">
          <div className="space-y-4">
            <h3 className="font-semibold text-muted-foreground text-lg">{t('sources.disclaimerTitle')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('sources.disclaimerText')}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}