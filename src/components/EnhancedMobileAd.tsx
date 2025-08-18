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
        height: '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)'
      }}
      onTouchStart={handleSwipeStart}
    >
      <div className="p-6 h-full flex flex-col relative">
        {/* Close button - top right corner */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          style={{ width: '36px', height: '36px' }}
          aria-label="Close ad"
        >
          <X className="h-5 w-5 text-white/80" />
        </button>

        {/* Main content area - clear left/right split */}
        <div className="flex flex-1 gap-6">
          {/* Left column: Text content */}
          <div className="flex-1 flex flex-col justify-center pr-4">
            {/* Small top text */}
            <p className="text-sm text-white/80 mb-2 uppercase tracking-wide">
              DON&apos;T MISS OUT ON
            </p>
            
            {/* Main headline */}
            <h3 className="text-2xl font-bold leading-tight text-white mb-4">
              {adVariant.title}
            </h3>
            
            {/* Price display */}
            {adVariant.originalPrice ? (
              <div className="mb-6">
                <span className="text-white/70 text-sm line-through block">Was {adVariant.originalPrice}</span>
                <span className="text-yellow-300 text-xl font-bold">Now {adVariant.price}</span>
              </div>
            ) : (
              <div className="text-xl font-bold text-yellow-300 mb-6">
                {adVariant.price}
              </div>
            )}
          </div>

          {/* Right column: Visual element */}
          <div className="w-28 flex-shrink-0 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-3xl flex items-center justify-center backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="text-4xl">
                {adVariant.icon || '🎯'}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width CTA button at bottom */}
        <button
          onClick={handleCTAClick}
          className="w-full font-bold py-4 rounded-2xl text-lg transition-all duration-200 hover:scale-[1.02] shadow-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#667eea',
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