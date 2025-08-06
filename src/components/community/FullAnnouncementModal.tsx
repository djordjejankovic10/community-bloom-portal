import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/**
 * FullAnnouncementModal Component
 * 
 * Displays the complete announcement details in a full-screen modal.
 * 
 * UX Notes:
 * - Opens when users tap the announcement banner for complete details
 * - Full-screen layout optimized for mobile reading experience
 * - Scrollable content handles long announcements gracefully
 * - Rich text formatting support for enhanced readability
 * - Clean header with community branding and easy dismissal
 */

export interface AnnouncementData {
  /** Unique identifier for the announcement */
  id: string;
  /** Main announcement title */
  title: string;
  /** Full announcement content with rich text support */
  content: string;
  /** Optional image URL to display */
  imageUrl?: string;
  /** Author information */
  author?: {
    name: string;
    role?: string;
    avatar?: string;
  };
  /** Publication timestamp */
  publishedAt?: string;
}

interface FullAnnouncementModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should be closed */
  onClose: () => void;
  /** Callback when user dismisses the announcement permanently */
  onDismiss: () => void;
  /** Announcement data to display */
  announcement: AnnouncementData;
}

export const FullAnnouncementModal: React.FC<FullAnnouncementModalProps> = ({
  isOpen,
  onClose,
  onDismiss,
  announcement
}) => {
  /**
   * Format rich text content for display
   * Handles basic markdown formatting like **bold** and bullet points
   */
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((paragraph, index) => {
        if (!paragraph.trim()) {
          return <div key={index} className="h-2" />; // Empty line spacing
        }

        // Handle bullet points
        if (paragraph.trim().startsWith('•')) {
          return (
            <div key={index} className="mb-3 flex items-start gap-2">
              <span className="text-primary mt-1 flex-shrink-0">•</span>
              <span className="text-base leading-relaxed">{formatInlineText(paragraph.trim().slice(1).trim())}</span>
            </div>
          );
        }

        // Handle headers (lines ending with :)
        if (paragraph.trim().endsWith(':') && paragraph.trim().startsWith('**')) {
          return (
            <h3 key={index} className="text-lg font-semibold text-foreground mb-3 mt-6 first:mt-0">
              {formatInlineText(paragraph.trim())}
            </h3>
          );
        }

        // Regular paragraphs
        return (
          <p key={index} className="mb-4 last:mb-0 text-base leading-relaxed text-foreground">
            {formatInlineText(paragraph.trim())}
          </p>
        );
      });
  };

  /**
   * Format inline text with bold formatting
   */
  const formatInlineText = (text: string): React.ReactNode => {
    if (!text.includes('**')) {
      return text;
    }

    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** markers and make bold
        const boldText = part.slice(2, -2);
        return (
          <strong key={index} className="font-semibold text-foreground">
            {boldText}
          </strong>
        );
      }
      return part;
    });
  };

  /**
   * Handle dismissing the announcement permanently
   * This closes the modal and marks the announcement as dismissed
   */
  const handleDismiss = () => {
    onDismiss();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className={cn(
          // Full-screen modal styling
          'w-screen h-screen max-w-none max-h-none m-0 p-0',
          // Remove default dialog styling for full-screen experience
          'border-0 rounded-none',
          // Ensure proper z-index for full-screen display
          'z-50'
        )}
      >
        {/* Modal Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-foreground">
            Community Announcement
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={handleDismiss}
            aria-label="Close announcement"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Featured Image (if available) */}
          {announcement.imageUrl && (
            <div className="w-full">
              <img
                src={announcement.imageUrl}
                alt=""
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="p-6">
            {/* Announcement Title */}
            <h1 className="text-2xl font-bold text-foreground mb-6 leading-tight">
              {announcement.title}
            </h1>

            {/* Full Announcement Content */}
            <div className="prose prose-sm sm:prose-base max-w-none text-foreground">
              {formatContent(announcement.content)}
            </div>

            {/* Done Button */}
            <div className="mt-8 pt-6 border-t">
              <Button
                onClick={handleDismiss}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                Done
              </Button>
            </div>

            {/* Bottom Spacing for Better UX */}
            <div className="h-4" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 