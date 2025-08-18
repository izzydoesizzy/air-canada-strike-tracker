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
      className="fixed bottom-0 left-0 right-0 z-50 shadow-xl animate-slide-in-right"
      style={{ 
        height: '65px',
        backgroundColor: '#f9f9f9',
        borderTop: '1px solid #e0e0e0'
      }}
      onTouchStart={handleSwipeStart}
    >
      <div className="px-3 py-2 max-w-7xl mx-auto h-full flex items-center justify-between relative">
        {/* Left content: Icon + Text */}
        <div className="flex items-center flex-1 pr-3">
          {/* Icon */}
          {adVariant.icon && (
            <div className="text-lg mr-2 flex-shrink-0">
              {adVariant.icon}
            </div>
          )}
          
          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* Main headline */}
            <h3 className="text-base font-bold leading-tight mb-0.5" style={{ color: '#1a1a1a' }}>
              {adVariant.title}
            </h3>
            
            {/* Subtitle */}
            <p className="text-xs leading-tight mb-0.5" style={{ color: '#666666' }}>
              {adVariant.subtitle}
            </p>
            
            {/* Price with discount styling */}
            {adVariant.originalPrice && (
              <div className="text-xs leading-tight">
                <span style={{ color: '#dc3545' }}>Was {adVariant.originalPrice}</span>
                {' → '}
                <span style={{ color: '#28a745' }}>Now {adVariant.price}</span>
              </div>
            )}
            
            {/* Social proof */}
            {adVariant.socialProof && (
              <div className="text-xs mt-0.5" style={{ color: '#666666' }}>
                ✅ {adVariant.socialProof}
              </div>
            )}
          </div>
        </div>

        {/* Right content: CTA Button */}
        <button
          onClick={handleCTAClick}
          className="font-bold px-4 py-2.5 rounded-lg text-sm transition-all duration-200 hover:scale-105 shadow-sm flex-shrink-0 min-h-[44px]"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '8px'
          }}
        >
          {adVariant.ctaText}
        </button>

        {/* Close button - top right corner */}
        <button
          onClick={dismiss}
          className="absolute top-1 right-1 p-1 hover:bg-gray-200 rounded-full transition-colors"
          style={{ width: '24px', height: '24px' }}
          aria-label="Close ad"
        >
          <X className="h-3 w-3" style={{ color: '#666666' }} />
        </button>
      </div>
    </div>
  );
};

export default EnhancedMobileAd;