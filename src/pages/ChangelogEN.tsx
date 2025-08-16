import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Clock, CheckCircle2, Zap, Bug, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ChangelogEN = () => {
  const { t, i18n } = useTranslation('changelog');

  useEffect(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Zap className="h-4 w-4" />;
      case 'improvement':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'fix':
        return <Bug className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-800';
      case 'improvement':
        return 'bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-800';
      case 'fix':
        return 'bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-800';
      case 'security':
        return 'bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-800';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-primary text-primary-foreground';
      case 'minor':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const versions = t('versions', { returnObjects: true }) as any;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tracker
            </Link>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">{t('title')}</h1>
            <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <div className="mb-12">
            <p className="text-muted-foreground leading-relaxed">{t('description')}</p>
          </div>

          {/* Version Timeline */}
          <div className="space-y-8">
            {Object.entries(versions).map(([version, data]: [string, any]) => (
              <Card key={version} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-semibold text-foreground">v{version}</h2>
                        <Badge className={getVersionBadgeColor(data.type)}>
                          {data.type === 'major' ? 'Major Release' : 'Minor Update'}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-medium text-foreground/90">{data.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{data.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-3">{data.summary}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.changes.map((change: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div className={`p-1.5 rounded-md border ${getTypeColor(change.type)}`}>
                          {getTypeIcon(change.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {change.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {t(`types.${change.type}`)}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-16 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Change Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(t('types', { returnObjects: true }) as any).map(([key, label]: [string, any]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md border ${getTypeColor(key)}`}>
                    {getTypeIcon(key)}
                  </div>
                  <span className="text-sm text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangelogEN;