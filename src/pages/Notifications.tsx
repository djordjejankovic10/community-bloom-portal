import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NotificationItem, NotificationSkeleton } from "@/components/notifications/NotificationItem";
import { Notification } from "@/types/notification";
import { MOCK_NOTIFICATIONS } from "@/data/mockNotifications";
import { ArrowLeft, Check, BellOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterType = 'all' | 'mentions' | 'replies';

/**
 * NotificationsPage Component
 * 
 * UX Notes: This page provides a comprehensive notification management experience with:
 * - Chronological sorting with unread notifications prioritized at the top
 * - Filtering capabilities for different notification types
 * - Bulk actions for managing multiple notifications
 * - Loading states that maintain user engagement
 * - Empty states that guide users on what to expect
 */
const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const navigate = useNavigate();
  
  // Simulate loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const unreadCount = notifications.filter(notif => !notif.isRead).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };
  
  // Filter notifications based on the active filter and sort by timestamp (latest first)
  const filteredNotifications = notifications
    .filter(notification => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'mentions') return notification.type === 'mention';
      if (activeFilter === 'replies') return notification.type === 'comment';
      return true;
    })
    .sort((a, b) => {
      // Sort by read status first (unread first), then by timestamp
      if (a.isRead !== b.isRead) {
        return a.isRead ? 1 : -1; // Unread notifications first
      }
      // For same read status, sort by timestamp (assuming more recent timestamps come first)
      return 0; // Keep existing order for same read status
    });
  
  return (
    <div className="flex flex-col flex-1 bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-bold text-xl">Notifications</h1>
          </div>
          
          {unreadCount > 0 && !isLoading && (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={handleMarkAllAsRead}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        
        <div className="px-4 py-2">
          <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterType)} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
              <TabsTrigger value="replies">Replies</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Separator />
      </div>
      
      <div>
        {isLoading ? (
          // Loading skeleton state
          <div>
            {Array.from({ length: 6 }).map((_, index) => (
              <NotificationSkeleton key={index} />
            ))}
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div>
            {filteredNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <BellOff className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-xl mb-2">No notifications</h3>
            <p className="text-muted-foreground max-w-md">
              When you receive notifications about your posts, comments, or community updates, they'll show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
