import { Notification } from "@/types/notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, Heart, MessageSquare, Bell, Users, Calendar, FileText, AtSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const navigate = useNavigate();
  
  const handleNotificationClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    navigate(notification.linkTo);
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "like":
        return <Heart className="h-5 w-5 text-pink-500" />;
      case "comment":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "mention":
        return <AtSign className="h-5 w-5 text-purple-500" />;
      case "follow":
        return <Users className="h-5 w-5 text-green-500" />;
      case "announcement":
        return <Bell className="h-5 w-5 text-amber-500" />;
      case "event":
        return <Calendar className="h-5 w-5 text-cyan-500" />;
      case "post":
        return <FileText className="h-5 w-5 text-slate-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-4 border-b transition-colors cursor-pointer",
        !notification.isRead ? "bg-muted/50" : "hover:bg-muted/20"
      )}
      onClick={handleNotificationClick}
    >
      {notification.sender ? (
        <Avatar className="h-10 w-10">
          <AvatarImage src={notification.sender.avatar} alt={notification.sender.name} />
          <AvatarFallback>{notification.sender.name[0]}</AvatarFallback>
        </Avatar>
      ) : notification.image ? (
        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
          <img src={notification.image} alt={notification.title} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-muted">
          {getNotificationIcon()}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="font-medium">{notification.title}</div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">{notification.timestamp}</div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{notification.message}</p>
      </div>

      {!notification.isRead && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 shrink-0" 
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead(notification.id);
          }}
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Mark as read</span>
        </Button>
      )}
    </div>
  );
};
