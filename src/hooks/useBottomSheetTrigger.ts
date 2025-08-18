import { useState, useEffect } from 'react';

interface UseBottomSheetTriggerOptions {
  timerDelay: number; // in milliseconds
  scrollPercentage: number; // 0-100
  localStorageKey: string;
}

export const useBottomSheetTrigger = ({
  timerDelay,
  scrollPercentage,
  localStorageKey
}: UseBottomSheetTriggerOptions) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = localStorage.getItem(localStorageKey);
    if (hasShown) {
      setHasBeenShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;

    // Timer trigger
    timeoutId = setTimeout(() => {
      if (!hasTriggered && !hasBeenShown) {
        setShouldShow(true);
        hasTriggered = true;
      }
    }, timerDelay);

    // Scroll trigger
    const handleScroll = () => {
      if (hasTriggered || hasBeenShown) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      if (scrollPercent >= scrollPercentage) {
        setShouldShow(true);
        hasTriggered = true;
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [timerDelay, scrollPercentage, localStorageKey, hasBeenShown]);

  const markAsShown = () => {
    localStorage.setItem(localStorageKey, 'true');
    setHasBeenShown(true);
    setShouldShow(false);
  };

  const dismiss = () => {
    setShouldShow(false);
  };

  return {
    shouldShow: shouldShow && !hasBeenShown,
    markAsShown,
    dismiss
  };
};