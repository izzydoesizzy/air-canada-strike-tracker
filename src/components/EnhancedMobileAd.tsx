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
        height: '130px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
      }}
      onTouchStart={handleSwipeStart}
    >
      <div className="p-4 h-full flex flex-col relative">
        {/* Close button - top right corner */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
          style={{ width: '28px', height: '28px' }}
          aria-label="Close ad"
        >
          <X className="h-4 w-4" style={{ color: '#666666' }} />
        </button>

        {/* Main content area - two columns */}
        <div className="flex flex-1 pb-3">
          {/* Left column: Text content */}
          <div className="flex-1 pr-4">
            {/* Icon + Title row */}
            <div className="flex items-center mb-2">
              {adVariant.icon && (
                <div className="text-xl mr-3 flex-shrink-0">
                  {adVariant.icon}
                </div>
              )}
              <h3 className="text-lg font-bold leading-tight" style={{ color: '#1a1a1a' }}>
                {adVariant.title}
              </h3>
            </div>
            
            {/* Subtitle */}
            <p className="text-sm leading-tight mb-2" style={{ color: '#666666' }}>
              {adVariant.subtitle}
            </p>
            
            {/* Price with discount styling */}
            {adVariant.originalPrice ? (
              <div className="text-sm font-medium">
                <span style={{ color: '#dc3545' }}>Was {adVariant.originalPrice}</span>
                {' → '}
                <span style={{ color: '#28a745', fontSize: '16px', fontWeight: 'bold' }}>Now {adVariant.price}</span>
              </div>
            ) : (
              <div className="text-lg font-bold" style={{ color: '#007bff' }}>
                {adVariant.price}
              </div>
            )}
            
            {/* Social proof */}
            {adVariant.socialProof && (
              <div className="text-xs mt-1" style={{ color: '#666666' }}>
                ✅ {adVariant.socialProof}
              </div>
            )}
          </div>

          {/* Right column: Visual element placeholder */}
          <div className="w-20 flex-shrink-0 flex items-center justify-center">
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#f0f8ff' }}
            >
              <div className="text-2xl">
                {adVariant.icon || '📧'}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width CTA button at bottom */}
        <button
          onClick={handleCTAClick}
          className="w-full font-bold py-3 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] shadow-sm"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '16px'
          }}
        >
          {adVariant.ctaText}
        </button>
      </div>
    </div>
  );
};

export default EnhancedMobileAd;