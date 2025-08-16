import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, AlertTriangle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function BreakingNewsBanner() {
  const { t } = useTranslation('dashboard');
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground shadow-large relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="animate-pulse absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              <span className="font-bold text-sm uppercase tracking-wider">
                {t('breakingNews.label')}
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-destructive-foreground/30"></div>
            <p className="text-sm font-medium flex-1">
              {t('breakingNews.message')}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href="https://www.ctvnews.ca/business/article/air-canada-flight-attendants-officially-begin-strike/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-xs font-medium hover:text-destructive-foreground/80 transition-colors bg-destructive-foreground/10 px-3 py-1 rounded-full"
            >
              {t('breakingNews.readMore')}
              <ExternalLink className="h-3 w-3" />
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 text-destructive-foreground hover:text-destructive-foreground/80 hover:bg-destructive-foreground/10"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t('breakingNews.dismiss')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}