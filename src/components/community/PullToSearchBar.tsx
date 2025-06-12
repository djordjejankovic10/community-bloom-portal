import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface PullToSearchBarProps {
  isVisible: boolean;
  className?: string;
}

/**
 * PullToSearchBar Component
 * 
 * Implements iOS-style pull-to-reveal search functionality.
 * Hidden by default and revealed when user pulls down on the feed.
 * Clicking navigates to the dedicated search page.
 * 
 * UX Notes:
 * - Follows iOS design patterns for familiar user experience
 * - Smooth animations provide visual feedback during reveal/hide
 * - Clickable trigger that navigates to full search experience
 * - Positioned above the "What's new?" composer for logical flow
 */
export const PullToSearchBar: React.FC<PullToSearchBarProps> = ({
  isVisible,
  className
}) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div 
      className={cn(
        "transition-all duration-300 ease-out overflow-hidden bg-background border-b",
        isVisible 
          ? "max-h-20 opacity-100 translate-y-0" 
          : "max-h-0 opacity-0 -translate-y-2",
        className
      )}
    >
      <div className="px-4 py-3">
        <button
          onClick={handleSearchClick}
          className="w-full relative flex items-center h-10 bg-secondary/50 rounded-lg px-3 hover:bg-secondary/70 transition-colors"
        >
          <Search className="h-4 w-4 text-muted-foreground mr-3" />
          <span className="text-muted-foreground text-sm">Search posts, members, topics...</span>
        </button>
      </div>
    </div>
  );
}; 