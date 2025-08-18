import { useState, useEffect } from 'react';

interface UseBottomSheetTriggerOptions {
  timerDelay: number; // in milliseconds
  scrollPercentage: number; // 0-100
}

export const useBottomSheetTrigger = ({
  timerDelay,
  scrollPercentage
}: UseBottomSheetTriggerOptions) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let autoHideTimeout: NodeJS.Timeout;
    let hasTriggered = false;

    // Timer trigger
    timeoutId = setTimeout(() => {
      if (!hasTriggered && !isDismissed) {
        setShouldShow(true);
        hasTriggered = true;
        
        // Auto-hide after 15 seconds
        autoHideTimeout = setTimeout(() => {
          setShouldShow(false);
        }, 15000);
      }
    }, timerDelay);

    // Scroll detection
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      // Detect scroll direction
      const direction = scrollTop > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      setLastScrollY(scrollTop);

      // Hide on scroll up (reading mode)
      if (direction === 'up' && shouldShow) {
        setShouldShow(false);
        return;
      }

      // Show on scroll down past trigger point (if not dismissed)
      if (!isDismissed && direction === 'down' && scrollPercent >= scrollPercentage) {
        if (!hasTriggered) {
          setShouldShow(true);
          hasTriggered = true;
          clearTimeout(timeoutId);

          // Auto-hide after 15 seconds
          autoHideTimeout = setTimeout(() => {
            setShouldShow(false);
          }, 15000);
        } else if (!shouldShow) {
          // Re-show if scrolling down and was hidden by scroll up
          setShouldShow(true);

          // Auto-hide after 15 seconds
          clearTimeout(autoHideTimeout);
          autoHideTimeout = setTimeout(() => {
            setShouldShow(false);
          }, 15000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(autoHideTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [timerDelay, scrollPercentage, isDismissed, shouldShow, lastScrollY]);

  const dismiss = () => {
    setIsDismissed(true);
    setShouldShow(false);
  };

  return {
    shouldShow: shouldShow && !isDismissed,
    dismiss,
    scrollDirection
  };
};