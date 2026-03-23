import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BreakingNewsBanner() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-large relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider">
                {t('labels.breakingNews')}
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-semibold text-white mb-0 sm:mb-1">
                {t('breaking.title')}
              </p>
              <p className="text-xs text-white/90 hidden sm:block">
                {t('breaking.message')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={t('breaking.link')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-xs font-medium hover:text-white/80 transition-colors bg-white/10 px-3 py-1 rounded-full"
            >
              {t('buttons.readMore')}
              <ExternalLink className="h-3 w-3" />
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 text-white hover:text-white/80 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t('buttons.dismiss')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
