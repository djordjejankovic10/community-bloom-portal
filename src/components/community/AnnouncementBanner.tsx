import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FullAnnouncementModal, type AnnouncementData } from './FullAnnouncementModal';

/**
 * AnnouncementBanner Component
 * 
 * A dismissible banner that appears at the very top of the community feed.
 * Displays important announcements from community leaders prominently.
 * 
 * UX Notes:
 * - Users see this banner immediately when they enter the feed
 * - The banner is theme-colored to draw attention to important announcements
 * - Content is limited to 3 lines to maintain clean feed layout
 * - Users can dismiss the banner with the X button on the right
 * - Dismissal state is remembered across sessions using localStorage
 * - The banner only shows if there's an active announcement to display
 */

interface AnnouncementBannerProps {
  /** The announcement text to display */
  announcement?: string;
  /** Unique ID for the announcement (used for dismissal tracking) */
  announcementId?: string;
  /** Whether the banner should be visible */
  isVisible?: boolean;
  /** Callback when the banner is dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
}

// Mock announcement data - in a real app, this would come from an API
const CURRENT_ANNOUNCEMENT = {
  id: 'community-guidelines-2024',
  text: 'New Community Guidelines: Please take a moment to review our updated community guidelines. We\'ve added new sections on respectful communication and content sharing best practices. Your cooperation helps maintain our positive community environment.',
};

// Full announcement data for the modal
const FULL_ANNOUNCEMENT_DATA: AnnouncementData = {
  id: 'community-guidelines-2024',
  title: 'New Community Guidelines Update',
  content: `We're excited to share some important updates to our community guidelines that will help us maintain the positive, supportive environment that makes our fitness community so special.

**What's New:**

• **Respectful Communication Standards**: We've clarified our expectations for constructive dialogue and feedback. Remember, we're all here to support each other's fitness journeys!

• **Content Sharing Best Practices**: New guidelines for sharing workout videos, progress photos, and nutrition advice to ensure everyone feels comfortable participating.

• **Inclusive Language Guidelines**: Updated language recommendations to make sure all community members feel welcome and valued, regardless of their fitness level or background.

• **Privacy and Safety**: Enhanced guidelines around sharing personal information and maintaining appropriate boundaries in our community spaces.

**Why These Changes Matter:**

Our community has grown tremendously, and these updates ensure we continue fostering an environment where everyone can thrive. These guidelines reflect feedback from our community members and align with our core values of support, respect, and inclusivity.

**Getting Started:**

Take a few minutes to review the complete guidelines in your account settings. If you have any questions, our moderation team is here to help. We appreciate your continued commitment to making this community a positive space for everyone.

Thank you for being an essential part of our fitness family! 💪`,
  imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
  author: {
    name: 'Community Team',
    role: 'ES Fitness Moderators',
    avatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop'
  },
  publishedAt: 'December 16, 2024'
};

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  announcement = CURRENT_ANNOUNCEMENT.text,
  announcementId = CURRENT_ANNOUNCEMENT.id,
  isVisible = true,
  onDismiss,
  className
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check localStorage on mount to see if this announcement was already dismissed
  useEffect(() => {
    // Clear dismissed announcements on page refresh for easier testing
    // In production, you'd remove this or make it conditional
    if (import.meta.env.DEV) {
      localStorage.removeItem('dismissedAnnouncements');
    }
    
    const dismissedAnnouncements = JSON.parse(
      localStorage.getItem('dismissedAnnouncements') || '{}'
    );
    
    if (dismissedAnnouncements[announcementId]) {
      setIsDismissed(true);
    }
  }, [announcementId]);

  /**
   * Handle dismissing the banner
   * Saves dismissal state to localStorage and calls onDismiss callback
   */
  const handleDismiss = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent opening modal when dismissing from banner
    
    // Save dismissal state to localStorage
    const dismissedAnnouncements = JSON.parse(
      localStorage.getItem('dismissedAnnouncements') || '{}'
    );
    dismissedAnnouncements[announcementId] = true;
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(dismissedAnnouncements));
    
    // Update local state
    setIsDismissed(true);
    
    // Call onDismiss callback if provided
    onDismiss?.();
  };

  /**
   * Handle opening the full announcement modal
   */
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Don't render if dismissed, not visible, or no announcement
  if (isDismissed || !isVisible || !announcement) {
    return null;
  }

  return (
    <>
      <div 
        className={cn(
          // Base styling with theme colors
          'w-full bg-primary/10 border-l-4 border-l-primary',
          // Layout and spacing - adjusted for larger text
          'px-3 py-2 flex items-start justify-between',
          // Sticky positioning
          'sticky top-0 z-40',
          // Mobile responsiveness
          'relative',
          // Clickable cursor
          'cursor-pointer hover:bg-primary/15 transition-colors',
          className
        )}
        onClick={handleOpenModal}
      >
      {/* Announcement content */}
      <div className="min-w-0 flex-shrink">
        <p 
          className={cn(
            'text-foreground line-clamp-3 overflow-hidden m-0 p-0'
          )}
          style={{
            // 14px font size and 1.5x line spacing
            fontSize: '14px',
            lineHeight: '1.5',
            // Fallback for browsers that don't support line-clamp
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as const,
            maxHeight: '63px' // 3 lines * 14px * 1.5 = 63px
          }}
        >
          {announcement}
        </p>
      </div>

      {/* Dismiss button - positioned on the right top corner */}
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4 p-0 text-primary hover:text-primary/80 hover:bg-primary/20 flex-shrink-0"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>

      {/* Full Announcement Modal */}
      <FullAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDismiss={() => handleDismiss()}
        announcement={FULL_ANNOUNCEMENT_DATA}
      />
    </>
  );
}; 