import { useState, useEffect } from 'react';
import { X, Star, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

  if (!shouldShow) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        markAsShown();
      }
    }}>
      <SheetContent 
        side="bottom" 
        className="h-[30vh] max-h-[400px] border-0 bg-background/95 backdrop-blur-xl rounded-t-2xl shadow-xl p-0 gap-0"
        style={{
          animation: 'slide-in-bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif'
        }}
      >
        {/* iOS-style drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-9 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 flex flex-col h-full">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Header */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <h2 className="text-lg font-semibold text-foreground leading-tight">
                Land Interviews in 20 Minutes
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From ignored to hired with AI-powered resume prompts
            </p>
          </div>

          {/* Social proof - compact */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-semibold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-tight">
                "Got 2 job offers within weeks!" - Annie
              </p>
            </div>
          </div>

          {/* Offer */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-foreground">$7</span>
                <span className="text-sm text-muted-foreground line-through">$99</span>
                <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded font-medium">
                  Limited Time
                </span>
              </div>
              <p className="text-xs text-muted-foreground">+ 30-day guarantee</p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleCTAClick}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))'
            }}
          >
            Get Instant Access
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResumeBottomSheet;