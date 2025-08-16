import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Zap, TrendingUp, Bug, Shield, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function ChangelogEN() {
  const { t, i18n } = useTranslation('changelog');

  useEffect(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature': return Zap;
      case 'improvement': return TrendingUp;
      case 'fix': return Bug;
      case 'security': return Shield;
      default: return Zap;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'improvement': return 'text-green-600 bg-green-50 border-green-200';
      case 'fix': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'security': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-primary text-primary-foreground';
      case 'minor': return 'bg-secondary text-secondary-foreground';
      case 'patch': return 'bg-muted text-muted-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const versions = t('versions', { returnObjects: true }) as Record<string, any> || {};
  const versionEntries = Object.entries(versions).sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">{t('title')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
            <p className="text-sm text-muted-foreground">{t('description')}</p>
          </div>
        </div>

        <div className="space-y-8">
          {versionEntries.map(([version, versionData]) => {
            const changes = versionData.changes || [];
            return (
              <Card key={version} className="shadow-large border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">v{version} - {versionData.title}</CardTitle>
                      <Badge className={getVersionBadgeColor(versionData.type)}>{versionData.type}</Badge>
                    </div>
                    <time className="text-sm text-muted-foreground">{versionData.date}</time>
                  </div>
                  <CardDescription className="text-base">{versionData.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {changes.map((item: any, changeIndex: number) => {
                      const Icon = getTypeIcon(item.type);
                      const hasDetails = item.details && item.details.length > 0;
                      
                      return (
                        <Collapsible key={changeIndex}>
                          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                            <div className={`p-2 rounded-full border ${getTypeColor(item.type)}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">{item.category}</Badge>
                                <Badge variant="secondary" className="text-xs">{t(`types.${item.type}`)}</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                                {hasDetails && (
                                  <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="ml-2">
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </CollapsibleTrigger>
                                )}
                              </div>
                              {hasDetails && (
                                <CollapsibleContent className="mt-3">
                                  <div className="pl-4 border-l-2 border-muted space-y-2">
                                    <p className="text-xs font-medium text-foreground mb-2">Technical Details:</p>
                                    {item.details.map((detail: string, detailIndex: number) => (
                                      <div key={detailIndex} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                        <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                                      </div>
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              )}
                            </div>
                          </div>
                        </Collapsible>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}