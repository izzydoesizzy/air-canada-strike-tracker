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
  }
};
export function StrikeOverview() {
  const { t } = useTranslation('content');
  
  return <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-light text-foreground tracking-tight">{t('strikeOverview.title')}</h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          {t('strikeOverview.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>;
}