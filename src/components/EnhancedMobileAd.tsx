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
      className="fixed bottom-4 left-4 right-4 z-50 animate-slide-in-right"
      style={{ 
        height: '160px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)'
      }}
      onTouchStart={handleSwipeStart}
    >
      <div className="p-5 h-full flex flex-col relative">
        {/* Close button - top right corner */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1.5 hover:bg-white/20 rounded-full transition-colors"
          style={{ width: '32px', height: '32px' }}
          aria-label="Close ad"
        >
          <X className="h-4 w-4 text-white/80" />
        </button>

        {/* Main content area - clear left/right split */}
        <div className="flex flex-1 pb-4 gap-4">
          {/* Left column: Text content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Icon + Title row */}
            <div className="flex items-center mb-3">
              {adVariant.icon && (
                <div className="text-2xl mr-3 flex-shrink-0">
                  {adVariant.icon}
                </div>
              )}
              <h3 className="text-xl font-bold leading-tight text-white">
                {adVariant.title}
              </h3>
            </div>
            
            {/* Subtitle */}
            <p className="text-sm leading-relaxed mb-3 text-white/90">
              {adVariant.subtitle}
            </p>
            
            {/* Price with discount styling */}
            {adVariant.originalPrice ? (
              <div className="text-sm font-medium mb-2">
                <span className="text-white/70 line-through">Was {adVariant.originalPrice}</span>
                <span className="text-yellow-300 text-lg font-bold ml-2">Now {adVariant.price}</span>
              </div>
            ) : (
              <div className="text-xl font-bold text-yellow-300 mb-2">
                {adVariant.price}
              </div>
            )}
            
            {/* Social proof */}
            {adVariant.socialProof && (
              <div className="text-xs text-white/80">
                ✅ {adVariant.socialProof}
              </div>
            )}
          </div>

          {/* Right column: Visual element with clear separation */}
          <div className="w-24 flex-shrink-0 flex items-center justify-center">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <div className="text-3xl">
                {adVariant.icon || '📧'}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width CTA button at bottom */}
        <button
          onClick={handleCTAClick}
          className="w-full font-bold py-4 rounded-2xl text-base transition-all duration-200 hover:scale-[1.02] shadow-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#667eea',
            fontSize: '16px',
            fontWeight: '700'
          }}
        >
          {adVariant.ctaText}
        </button>
      </div>
    </div>
  );
};

export default EnhancedMobileAd;