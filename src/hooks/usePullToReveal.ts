import { useState, useEffect, useRef, useCallback } from 'react';

interface UsePullToRevealOptions {
  threshold?: number; // How far to pull before revealing (in pixels)
  hideThreshold?: number; // How far to scroll down before hiding (in pixels)
}

/**
 * usePullToReveal Hook
 * 
 * Detects iOS-style pull-to-reveal scroll behavior.
 * Returns whether the search bar should be visible based on scroll position and direction.
 * 
 * Logic:
 * - Hidden by default
 * - Shows when user pulls down from the top (negative scroll or overscroll)
 * - Hides when user scrolls down past the threshold
 * - Stays visible when at the top of the page
 */
export const usePullToReveal = (options: UsePullToRevealOptions = {}) => {
  const { threshold = 50, hideThreshold = 100 } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
    
    // Check if we're at the top
    const atTop = currentScrollY <= 5;
    setIsAtTop(atTop);
    
    // Only show search when actively pulling up from the very top
    if (atTop && scrollDirection === 'up' && lastScrollY.current > 0) {
      setIsVisible(true);
    }
    // If we're scrolling down and past the hide threshold, hide search
    else if (scrollDirection === 'down' && currentScrollY > hideThreshold) {
      setIsVisible(false);
    }
    // Hide by default unless actively being revealed
    else if (!atTop) {
      setIsVisible(false);
    }
    
    lastScrollY.current = currentScrollY;
  }, [threshold, hideThreshold]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    const currentScrollY = window.scrollY;
    
    // If we're at the top and pulling down, show search
    if (currentScrollY <= 5 && deltaY > threshold) {
      setIsVisible(true);
    }
  }, [threshold]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    // Don't run initial check - start hidden by default
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add touch listeners for mobile pull-to-reveal
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    isVisible,
    isAtTop,
    setIsVisible
  };
}; 