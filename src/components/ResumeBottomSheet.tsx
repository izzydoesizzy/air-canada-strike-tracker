import { X } from 'lucide-react';
import { useBottomSheetTrigger } from '@/hooks/useBottomSheetTrigger';

const ResumeBottomSheet = () => {
  const { shouldShow, dismiss } = useBottomSheetTrigger({
    timerDelay: 15000, // 15 seconds
    scrollPercentage: 40, // 40% scroll
  });

  const handleCTAClick = () => {
    window.open('https://stan.store/joinclearcareer/p/the-20minute-resume-levelup', '_blank');
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
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg animate-slide-in-right"
      style={{ maxHeight: '80px' }}
      onTouchStart={handleSwipeStart}
    >
      <div className="px-4 py-2 max-w-7xl mx-auto">
        {/* Top row: Main text + Close button */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-foreground">
            Land your dream job faster
          </p>
          <button
            onClick={dismiss}
            className="p-1 hover:bg-muted rounded-full transition-colors ml-2"
            aria-label="Close ad"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Bottom row: Price + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-foreground">$7</span>
            <span className="text-xs text-muted-foreground line-through">(was $99)</span>
          </div>
          <button
            onClick={handleCTAClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Get Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBottomSheet;