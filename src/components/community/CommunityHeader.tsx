import { BellIcon, MessageCircle, Search } from "lucide-react";
import { CommunityMenu } from "./CommunityMenu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MOCK_NOTIFICATIONS } from "@/data/mockNotifications";
import { NotificationBadge } from "@/components/notifications/NotificationBadge";

export const CommunityHeader = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Calculate unread notifications count
  useEffect(() => {
    const count = MOCK_NOTIFICATIONS.filter(notif => !notif.isRead).length;
    setUnreadCount(count);
  }, []);
  return (
    <header className="sticky top-0 bg-background border-b border-border z-50">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <CommunityMenu />
          <h1 className="text-2xl font-bold text-foreground">Community</h1>
        </div>
        <div className="flex gap-2">
          <button 
            className="p-1.5 text-primary hover:text-primary/80 transition-colors"
            onClick={() => navigate("/search")}
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            className="p-1.5 text-primary hover:text-primary/80 transition-colors relative"
            onClick={() => navigate("/messages")}
          >
            <MessageCircle className="w-5 h-5" />
            {/* Add a badge for unread messages */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">4</span>
          </button>
          <button 
            className="p-1.5 text-primary hover:text-primary/80 transition-colors relative"
            onClick={() => navigate("/notifications")}
          >
            <BellIcon className="w-5 h-5" />
            <NotificationBadge count={unreadCount} className="-top-1.5 -right-1.5" />
          </button>
        </div>
      </div>
    </header>
  );
};