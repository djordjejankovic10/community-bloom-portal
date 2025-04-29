import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { Notification } from "@/types/notification";
import { MOCK_NOTIFICATIONS } from "@/data/mockNotifications";
import { ArrowLeft, Check, BellOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterType = 'all' | 'mentions' | 'replies';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(notif => !notif.isRead).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };
  
  // Filter notifications based on the active filter
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'mentions') return notification.type === 'mention';
    if (activeFilter === 'replies') return notification.type === 'comment';
    return true;
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
          
          {unreadCount > 0 && (
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
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
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
