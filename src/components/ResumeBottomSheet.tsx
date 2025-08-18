import { useState, useEffect } from 'react';
import { X, Star, ArrowRight } from 'lucide-react';
import { useBottomSheetTrigger } from '@/hooks/useBottomSheetTrigger';

const ResumeBottomSheet = () => {
  const { shouldShow, markAsShown, dismiss } = useBottomSheetTrigger({
    timerDelay: 50000, // 50 seconds
    scrollPercentage: 50, // 50% scroll
    localStorageKey: 'resume-popup-shown'
  });

  const [isOpen, setIsOpen] = useState(false);

  // Update open state when trigger conditions are met
  useEffect(() => {
    if (shouldShow && !isOpen) {
      setIsOpen(true);
    }
  }, [shouldShow, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    markAsShown();
  };

  const handleCTAClick = () => {
    // Track analytics here if needed
    window.open('https://stan.store/joinclearcareer/p/the-20minute-resume-levelup', '_blank');
    handleClose();
  };

  if (!shouldShow || !isOpen) return null;

  return (
    <>
      {/* Floating Card - No Overlay, Allows Scroll-Through */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        style={{ 
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif' 
        }}
      >
        <div 
          className="mx-4 mb-4 bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/20 pointer-events-auto"
          style={{
            animation: 'slide-in-bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            maxHeight: '30vh',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)'
          }}
        >
          {/* iOS-style drag handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-9 h-1 bg-muted-foreground/30 rounded-full" />
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {/* Header - Compact */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🚀</span>
                <h2 className="text-base font-semibold text-foreground leading-tight">
                  Land Interviews in 20 Minutes
                </h2>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                From ignored to hired with AI-powered resume prompts
              </p>
            </div>

            {/* Social proof - Ultra compact */}
            <div className="flex items-center gap-2 mb-3 p-2 bg-muted/20 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-tight">
                  "94% land interviews in weeks!" - Annie
                </p>
              </div>
            </div>

            {/* Offer & CTA Combined */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-foreground">$7</span>
                  <span className="text-xs text-muted-foreground line-through">$99</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-medium">
                    Ends Today
                  </span>
                  <span className="text-xs text-muted-foreground">• 30-day guarantee</span>
                </div>
              </div>
              
              {/* CTA - Compact */}
              <button
                onClick={handleCTAClick}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg hover:shadow-xl min-w-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))'
                }}
              >
                <span className="text-sm">Start Now</span>
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBottomSheet;