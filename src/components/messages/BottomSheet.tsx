import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const BottomSheet = ({ 
  isOpen, 
  onClose, 
  children, 
  className 
}: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle animation timing with proper sequence
  useEffect(() => {
    if (isOpen) {
      // First make the component visible in the closed position
      setIsVisible(true);
      setIsAnimating(false); // Start in the closed position
      
      // Use requestAnimationFrame to ensure the browser has rendered the initial state
      // before starting the animation
      requestAnimationFrame(() => {
        // Use a small timeout to ensure the initial state is fully rendered
        setTimeout(() => {
          // This will trigger the animation from closed to open position
          setIsAnimating(true);
        }, 10);
      });
    } else {
      // When closing, immediately start closing animation
      setIsAnimating(false);
      
      // Wait for animation to complete before hiding the component
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  if (!isVisible && !isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Semi-transparent backdrop - clicking it closes the sheet */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/20 transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
      />
      
      {/* Bottom sheet content - stopping propagation to prevent closing when clicking content */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 overflow-y-auto bg-background rounded-t-xl shadow-lg transform transition-transform duration-300 ease-out min-h-[50vh] w-full max-w-full sm:max-w-3xl sm:mx-auto",
          isAnimating ? "translate-y-0" : "translate-y-full",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle for dragging */}
        <div className="w-full flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
        </div>
        
        {children}
      </div>
    </div>
  );
};
