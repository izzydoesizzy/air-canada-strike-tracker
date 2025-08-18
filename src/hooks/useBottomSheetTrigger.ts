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
  const [engagementScore, setEngagementScore] = useState(0);

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = localStorage.getItem(localStorageKey);
    if (hasShown) {
      setHasBeenShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;
    let lastScrollY = 0;
    let scrollVelocity = 0;
    let engagementTimer: NodeJS.Timeout;
    let currentEngagement = 0;

    // Enhanced engagement detection
    const trackEngagement = () => {
      currentEngagement++;
      setEngagementScore(currentEngagement);
    };

    // Start engagement timer
    engagementTimer = setInterval(trackEngagement, 3000); // Every 3 seconds of presence

    // Enhanced timer trigger with engagement requirement
    timeoutId = setTimeout(() => {
      if (!hasTriggered && !hasBeenShown && currentEngagement >= 5) {
        setShouldShow(true);
        hasTriggered = true;
      }
    }, Math.max(timerDelay, 30000)); // Minimum 30 seconds

    // Enhanced scroll detection with exit-intent for mobile
    const handleScroll = () => {
      if (hasTriggered || hasBeenShown) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      // Calculate scroll velocity for exit-intent detection
      scrollVelocity = scrollTop - lastScrollY;
      lastScrollY = scrollTop;

      // Standard scroll trigger
      if (scrollPercent >= scrollPercentage && currentEngagement >= 3) {
        setShouldShow(true);
        hasTriggered = true;
        clearTimeout(timeoutId);
        return;
      }

      // Mobile exit-intent: rapid upward scroll near top
      if (scrollPercent < 10 && scrollVelocity < -50 && currentEngagement >= 2) {
        setShouldShow(true);
        hasTriggered = true;
        clearTimeout(timeoutId);
      }
    };

    // Track user interactions for engagement
    const trackInteraction = () => {
      currentEngagement += 0.5;
      setEngagementScore(currentEngagement);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', trackInteraction, { passive: true });
    window.addEventListener('touchstart', trackInteraction, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      clearInterval(engagementTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', trackInteraction);
      window.removeEventListener('touchstart', trackInteraction);
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