import { useState, useEffect } from 'react';
import { X, Star, ArrowRight, Shield, Clock } from 'lucide-react';
import { useBottomSheetTrigger } from '@/hooks/useBottomSheetTrigger';

const ResumeBottomSheet = () => {
  const { shouldShow, markAsShown, dismiss } = useBottomSheetTrigger({
    timerDelay: 30000, // 30 seconds minimum
    scrollPercentage: 40, // 40% scroll
    localStorageKey: 'resume-popup-shown'
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Update open state when trigger conditions are met
  useEffect(() => {
    if (shouldShow && !isOpen) {
      setIsOpen(true);
    }
  }, [shouldShow, isOpen]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsOpen(false);
      markAsShown();
      setIsExiting(false);
    }, 300);
  };

  const handleCTAClick = () => {
    // Add haptic feedback for supported devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    window.open('https://stan.store/joinclearcareer/p/the-20minute-resume-levelup', '_blank');
    handleClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSwipeStart = (e: React.TouchEvent) => {
    const startY = e.touches[0].clientY;
    
    const handleSwipeMove = (moveEvent: TouchEvent) => {
      const currentY = moveEvent.touches[0].clientY;
      const deltaY = currentY - startY;
      
      if (deltaY > 50) { // Swipe down threshold
        handleClose();
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

  if (!shouldShow || !isOpen) return null;

  return (
    <>
      {/* Enhanced Floating Card with Backdrop */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleBackdropClick}
        style={{ 
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(1px)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif' 
        }}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out ${
            isExiting ? 'translate-y-full' : 'translate-y-0'
          }`}
          onTouchStart={handleSwipeStart}
        >
          <div 
            className="mx-3 mb-3 bg-background/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/30 overflow-hidden"
            style={{
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              transform: isExiting ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* iOS-style drag handle with animation */}
            <div className="flex justify-center pt-4 pb-2">
              <div 
                className="w-10 h-1 bg-muted-foreground/40 rounded-full transition-all duration-200 hover:bg-muted-foreground/60"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}
              />
            </div>

            {/* Content */}
            <div className="px-5 pb-2">
              {/* Close button - Enhanced */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted/80 transition-all duration-200 hover:scale-110"
                aria-label="Close ad"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Header - Enhanced with urgency */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    <span className="text-2xl">🚀</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-foreground leading-tight">
                      Get Hired This Week
                    </h2>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3 text-destructive" />
                      <span className="text-xs text-destructive font-medium">24 hours left</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI-powered resume that lands interviews in 20 minutes
                </p>
              </div>

              {/* Enhanced Social Proof */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-md">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">(2,847 reviews)</span>
                  </div>
                  <p className="text-sm text-foreground font-medium leading-tight">
                    "94% of users land interviews within 2 weeks!"
                  </p>
                </div>
              </div>

              {/* Pricing & CTA Section */}
              <div className="space-y-3">
                {/* Pricing with guarantee */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">$7</span>
                      <span className="text-sm text-muted-foreground line-through">$99</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        93% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Shield className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Free if it doesn't work</span>
                    </div>
                  </div>
                  
                  {/* Urgency indicator */}
                  <div className="text-right">
                    <div className="text-xs bg-destructive/15 text-destructive px-2 py-1 rounded-md font-medium border border-destructive/20">
                      Ends Today
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">47 people viewing</div>
                  </div>
                </div>
                
                {/* Enhanced CTA */}
                <button
                  onClick={handleCTAClick}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    boxShadow: '0 10px 25px -5px rgba(var(--primary-rgb), 0.4)',
                  }}
                >
                  <span className="text-base">Start Now - Get Hired This Week</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                
                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    30-day guarantee
                  </span>
                  <span>•</span>
                  <span>Instant access</span>
                  <span>•</span>
                  <span>No subscription</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBottomSheet;