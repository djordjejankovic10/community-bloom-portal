import { Notification } from "@/types/notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Bell, 
  Trophy,
  MessageCircle,
  CalendarDays,
  Megaphone,
  Video
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

interface NotificationSkeletonProps {
  className?: string;
}

/**
 * NotificationSkeleton Component
 * 
 * UX Notes: Provides visual feedback during loading states, maintaining 
 * the same layout structure as the actual notification to prevent layout 
 * shifts and provide a smooth loading experience for users.
 */
export const NotificationSkeleton = ({ className }: NotificationSkeletonProps) => {
  return (
    <div className={cn("flex items-start gap-3 p-4 border-b", className)}>
      {/* Avatar skeleton */}
      <div className="relative">
        <Skeleton className="h-14 w-14 rounded-full" />
        {/* Badge skeleton */}
        <div className="absolute -bottom-1.5 -right-1.5">
          <Skeleton className="h-8 w-8 rounded-full border-2 border-card" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>

      {/* Read/Unread indicator space */}
      <div className="w-4 flex-shrink-0" />
    </div>
  );
};

/**
 * NotificationItem Component
 * 
 * UX Notes: This component provides a comprehensive notification experience with:
 * - Clear visual hierarchy through typography and spacing
 * - Immediate feedback for read/unread states through color and right-aligned indicators
 * - Contextual type badges with 10% color tints for subtle type identification
 * - 32px badges with solid light color backgrounds, full-color icons, and 2px borders
 * - Interactive hover states that provide tactile feedback
 * - Accessible design with proper contrast ratios and focus states
 */
export const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const navigate = useNavigate();
  
  /**
   * Handles notification click interaction
   * UX Notes: Automatically marks unread notifications as read when clicked,
   * providing immediate visual feedback and reducing cognitive load for users
   */
  const handleNotificationClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    navigate(notification.linkTo);
  };

  /**
   * Returns the appropriate icon, background, and text color for each notification type
   * UX Notes: Uses consistent iconography that matches user mental models
   * and subtle 10% color tints (solid light colors) with full-color icons for clear type identification.
   */
  const getNotificationTypeConfig = () => {
    switch (notification.type) {
      case "challenge":
        return { 
          icon: Trophy, // 🎯 "challenge" icon
          bgClass: "bg-chart-4/10",
          textClass: "text-chart-4"
        };
      case "message":
      case "channel":
        return { 
          icon: MessageCircle, // 💬 "chat" icon for both messages and channels
          bgClass: "bg-chart-2/10",
          textClass: "text-chart-2"
        };
      case "event":
        return { 
          icon: CalendarDays, // 📅 "event" icon
          bgClass: "bg-chart-1/10",
          textClass: "text-chart-1"
        };
      case "announcement":
      case "joinrequest":
        return { 
          icon: Megaphone, // 📢 "announcement" icon for both
          bgClass: "bg-chart-3/10",
          textClass: "text-chart-3"
        };
      case "liveroom":
        return { 
          icon: Video, // 🔴 "liveroom" icon
          bgClass: "bg-chart-5/10",
          textClass: "text-chart-5"
        };
      case "like":
        return { 
          icon: Bell, // 🔔 Default for non-specified types
          bgClass: "bg-primary/10",
          textClass: "text-primary"
        };
      case "comment":
        return { 
          icon: MessageCircle, // 💬 Comments are message-related
          bgClass: "bg-chart-2/10",
          textClass: "text-chart-2"
        };
      case "mention":
        return { 
          icon: MessageCircle, // 💬 Mentions are message-related
          bgClass: "bg-chart-2/10",
          textClass: "text-chart-2"
        };
      case "follow":
        return { 
          icon: Bell, // 🔔 Default for non-specified types
          bgClass: "bg-primary/10",
          textClass: "text-primary"
        };
      case "post":
        return { 
          icon: Bell, // 🔔 Default for non-specified types
          bgClass: "bg-primary/10",
          textClass: "text-primary"
        };
      default:
        return { 
          icon: Bell, 
          bgClass: "bg-primary/10",
          textClass: "text-primary"
        };
    }
  };

  const typeConfig = getNotificationTypeConfig();
  const IconComponent = typeConfig.icon;

  /**
   * Formats the notification message with bold names
   * UX Notes: Bold formatting helps users quickly identify who performed the action,
   * improving scan-ability and social connection
   */
  const formatMessage = (message: string) => {
    // Simple bold formatting for names (assuming names are at the start)
    if (notification.sender?.name) {
      const senderName = notification.sender.name;
      if (message.includes(senderName)) {
        const parts = message.split(senderName);
        return (
          <>
            <span className="font-semibold">{senderName}</span>
            {parts[1]}
          </>
        );
      }
    }
    return message;
  };

      return (
      <div 
        className={cn(
          "flex items-start gap-3 p-4 border-b transition-colors cursor-pointer hover:bg-muted/50",
          !notification.isRead && "bg-muted/20"
        )}
        onClick={handleNotificationClick}
      >
        {/* User Avatar (Large) with Type Badge Overlay */}
        <div className="relative">
          <Avatar className="h-14 w-14 ring-1 ring-border">
            <AvatarImage 
              src={notification.sender?.avatar || notification.image} 
              alt={notification.sender?.name || notification.title} 
            />
            <AvatarFallback className="text-lg">
              {notification.sender?.name?.[0] || notification.title[0]}
            </AvatarFallback>
          </Avatar>
          
          {/* Notification Type Icon (Small Badge) */}
          <div 
            className={cn(
              "absolute -bottom-1.5 -right-1.5 h-8 w-8 rounded-full flex items-center justify-center border-2 border-background",
              typeConfig.bgClass
            )}
          >
            <IconComponent 
              className={cn("h-4 w-4", typeConfig.textClass)} 
            />
          </div>
        </div>
        
        {/* Notification Content */}
        <div className="flex-1 min-w-0">
          {/* Notification Description (Main Text) */}
          <div 
            className={cn(
              "font-[450] leading-relaxed",
              !notification.isRead 
                ? "text-foreground/90" 
                : "text-foreground/60"
            )}
          >
            {formatMessage(notification.message)}
          </div>
          
          {/* Timestamp (Bottom Text) */}
          <div 
            className={cn(
              "text-xs font-bold mt-1",
              !notification.isRead 
                ? "text-primary font-bold" 
                : "text-foreground/60"
            )}
          >
            {notification.timestamp}
          </div>
        </div>

        {/* Read/Unread Indicator (Right Edge) */}
        <div className="flex items-center justify-center w-4 flex-shrink-0">
          {!notification.isRead && (
            <div className="w-2 h-2 rounded-full bg-primary" />
          )}
        </div>
      </div>
    );
};

/**
 * NotificationSectionHeader Component
 * 
 * UX Notes: Provides clear temporal grouping of notifications,
 * helping users understand the recency and relevance of their notifications
 */
interface NotificationSectionHeaderProps {
  title: "New" | "Earlier";
  className?: string;
}

export const NotificationSectionHeader = ({ title, className }: NotificationSectionHeaderProps) => {
  return (
    <div className={cn("px-4 py-2 text-sm font-medium text-foreground/60", className)}>
      {title}
    </div>
  );
};
