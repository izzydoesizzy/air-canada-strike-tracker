import { X } from 'lucide-react';
import { useBottomSheetTrigger } from '@/hooks/useBottomSheetTrigger';
import { getAdVariant } from '@/utils/abTesting';
import { useState, useEffect } from 'react';

const EnhancedMobileAd = () => {
  const { shouldShow, dismiss } = useBottomSheetTrigger({
    timerDelay: 15000, // 15 seconds
    scrollPercentage: 40, // 40% scroll
  });

  const [adVariant, setAdVariant] = useState(() => getAdVariant());

  useEffect(() => {
    // Ensure we have a variant assigned
    setAdVariant(getAdVariant());
  }, []);

  const handleCTAClick = () => {
    window.open(adVariant.url, '_blank');
    dismiss();
  };

  const handleSwipeStart = (e: React.TouchEvent) => {
    const startY = e.touches[0].clientY;
    
    const handleSwipeMove = (moveEvent: TouchEvent) => {
      const currentY = moveEvent.touches[0].clientY;
      const deltaY = currentY - startY;
      
      if (deltaY > 50) { // Swipe down threshold
        dismiss();
        document.removeEventListener('touchmove', handleSwipeMove);
        document.removeEventListener('touchend', handleSwipeEnd);
      }
    };
    
    const handleSwipeEnd = () => {
      document.removeEventListener('touchmove', handleSwipeMove);
      document.removeEventListener('touchend', handleSwipeEnd);
    };
    
    document.addEventListener('touchmove', handleSwipeMove, { passive: true });
    document.addEventListener('touchend', handleSwipeEnd, { passive: true });
  };

  if (!shouldShow) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-xl animate-slide-in-right"
      style={{ height: '110px' }}
      onTouchStart={handleSwipeStart}
    >
      <div className="px-4 py-3 max-w-7xl mx-auto h-full flex flex-col justify-between">
        {/* Header with close button */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            {/* Main value proposition */}
            <h3 className="text-sm font-semibold text-foreground leading-tight mb-1">
              {adVariant.title}
            </h3>
            {/* Supporting detail */}
            <p className="text-xs text-muted-foreground leading-tight">
              {adVariant.subtitle}
            </p>
          </div>
          
          {/* Close button */}
          <button
            onClick={dismiss}
            className="p-1.5 hover:bg-muted rounded-full transition-colors flex-shrink-0 mt-0.5"
            aria-label="Close ad"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between">
          {/* Original price */}
          {adVariant.originalPrice && (
            <div className="text-xs text-muted-foreground">
              (was {adVariant.originalPrice})
            </div>
          )}
          
          {/* CTA Button */}
          <button
            onClick={handleCTAClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm transition-all duration-200 hover:scale-105 shadow-sm"
          >
            {adVariant.ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMobileAd;