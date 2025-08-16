import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search, AlertTriangle, FileText, MessageSquare, BarChart3 } from "lucide-react";

interface Resource {
  name: string;
  description: string;
  url: string;
  category: 'emergency' | 'official' | 'community' | 'analysis';
  priority?: 'high' | 'medium' | 'low';
}

const categoryIcons = {
  emergency: AlertTriangle,
  official: FileText,
  community: MessageSquare,
  analysis: BarChart3,
};

export function Resources() {
  const { t } = useTranslation('resources');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      name: t('resources.emergencySupport.mutualAid.name'),
      description: t('resources.emergencySupport.mutualAid.description'),
      url: 'https://docs.google.com/spreadsheets/d/1t67DSAMr4pGLkNh18tjnYoxRHOOB442qNRQP2uNXlX0/edit?gid=0#gid=0',
      category: 'emergency',
      priority: 'high'
    },
    {
      name: t('resources.emergencySupport.mainMegathread.name'),
      description: t('resources.emergencySupport.mainMegathread.description'),
      url: 'https://www.reddit.com/r/aircanada/comments/1mrio62/megathread_ac_fa_strike_aug_16/',
      category: 'emergency',
      priority: 'high'
    },
    {
      name: t('resources.officialInfo.acStrikeUpdate.name'),
      description: t('resources.officialInfo.acStrikeUpdate.description'),
      url: 'https://www.aircanada.com/ca/en/aco/home/book/travel-news-and-updates/2025/ac-action.html#/',
      category: 'official',
      priority: 'high'
    },
    {
      name: t('resources.officialInfo.acVacations.name'),
      description: t('resources.officialInfo.acVacations.description'),
      url: 'https://vacations.aircanada.com/en/plan-your-trip/travel-info/travel-advisories/air-canada-labour-negotiations',
      category: 'official'
    },
    {
      name: t('resources.officialInfo.compensationWiki.name'),
      description: t('resources.officialInfo.compensationWiki.description'),
      url: 'https://www.reddit.com/mod/aircanada/wiki/index/',
      category: 'official'
    },
    {
      name: t('resources.community.bindingArbitration.name'),
      description: t('resources.community.bindingArbitration.description'),
      url: 'https://www.reddit.com/r/aircanada/comments/1ms0zsa/megathread_ac_fa_strike_binding_arbitration/',
      category: 'community'
    },
    {
      name: t('resources.community.strikeMandate.name'),
      description: t('resources.community.strikeMandate.description'),
      url: 'https://www.reddit.com/r/aircanada/comments/1mio0bd/megathread_strike_mandate_update/',
      category: 'community'
    },
    {
      name: t('resources.community.aug1213.name'),
      description: t('resources.community.aug1213.description'),
      url: 'https://www.reddit.com/r/aircanada/comments/1morhu3/megathread_ac_fa_strike_aug_1213/',
      category: 'community'
    },
    {
      name: t('resources.community.aug1415.name'),
      description: t('resources.community.aug1415.description'),
      url: 'https://www.reddit.com/r/aircanada/comments/1mqhiyy/megathread_ac_fa_strike_aug_1415/',
      category: 'community'
    },
    {
      name: t('resources.analysis.faSalary.name'),
      description: t('resources.analysis.faSalary.description'),
      url: 'https://www.reddit.com/r/britishcolumbia/comments/1mqgl8k/how_much_an_air_canada_flight_attendants_actually/',
      category: 'analysis'
    },
    {
      name: t('resources.analysis.cupeStatement.name'),
      description: t('resources.analysis.cupeStatement.description'),
      url: 'https://cupe.ca/statement-cupe-air-canadas-request-binding-arbitration',
      category: 'analysis'
    },
    {
      name: t('resources.analysis.ministerOrder.name'),
      description: t('resources.analysis.ministerOrder.description'),
      url: 'https://globalnews.ca/news/11337659/air-canada-hajdu-2/',
      category: 'analysis'
    },
    {
      name: t('resources.analysis.ceaseDesist.name'),
      description: t('resources.analysis.ceaseDesist.description'),
      url: 'https://www.paddleyourownkanoo.com/2025/08/16/air-canada-serves-cease-and-desist-on-flight-attendants-for-illegal-strike-activity/',
      category: 'analysis'
    }
  ];

  const categories = [
    { key: 'all', label: t('categories.all') },
    { key: 'emergency', label: t('categories.emergency') },
    { key: 'official', label: t('categories.official') },
    { key: 'community', label: t('categories.community') },
    { key: 'analysis', label: t('categories.analysis') }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resourcesByCategory = categories.slice(1).map(category => ({
    ...category,
    resources: filteredResources.filter(r => r.category === category.key),
    icon: categoryIcons[category.key as keyof typeof categoryIcons]
  }));

  return (
    <section id="resources" className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Essential Resources Alert */}
          {selectedCategory === 'all' && (
            <Card className="mb-8 border-primary-red bg-primary-red/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary-red" />
                  <CardTitle className="text-primary-red">{t('essential.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">{t('essential.description')}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {resources.filter(r => r.priority === 'high').map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-surface rounded-lg border hover:bg-surface-elevated transition-colors group"
                    >
                      <span className="font-medium text-foreground group-hover:text-primary-blue transition-colors">
                        {resource.name}
                      </span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary-blue transition-colors" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resource Categories */}
          {selectedCategory === 'all' ? (
            <div className="space-y-12">
              {resourcesByCategory.map(category => {
                if (category.resources.length === 0) return null;
                const Icon = category.icon;
                return (
                  <div key={category.key}>
                    <div className="flex items-center gap-3 mb-6">
                      <Icon className="h-6 w-6 text-primary-blue" />
                      <h3 className="text-2xl font-semibold text-foreground">
                        {category.label}
                      </h3>
                    </div>
                    <div className="grid gap-4">
                      {category.resources.map((resource, index) => (
                        <Card key={index} className="group hover:shadow-large transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg group-hover:text-primary-blue transition-colors">
                                {resource.name}
                              </CardTitle>
                              {resource.priority === 'high' && (
                                <Badge variant="destructive" className="ml-2">
                                  {t('priority.high')}
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-muted-foreground">
                              {resource.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary-blue hover:text-accent-blue transition-colors font-medium"
                            >
                              {t('buttons.viewResource')}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredResources.map((resource, index) => (
                <Card key={index} className="group hover:shadow-large transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-primary-blue transition-colors">
                        {resource.name}
                      </CardTitle>
                      {resource.priority === 'high' && (
                        <Badge variant="destructive" className="ml-2">
                          {t('priority.high')}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-blue hover:text-accent-blue transition-colors font-medium"
                    >
                      {t('buttons.viewResource')}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('noResults')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}