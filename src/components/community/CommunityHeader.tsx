import { BellIcon, MessageCircle, User, ChevronDown, X, Plus } from "lucide-react";
import { CommunityMenu } from "./CommunityMenu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MOCK_NOTIFICATIONS } from "@/data/mockNotifications";
import { NotificationBadge } from "@/components/notifications/NotificationBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMenuPreferences, Site } from "@/context/MenuPreferencesContext";
import { MOCK_SITES } from "@/data/mock-sites";
import { Button } from "@/components/ui/button";

export const CommunityHeader = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { sites } = useMenuPreferences();
  const [displaySites, setDisplaySites] = useState<Site[]>([]);
  
  // Calculate unread notifications count
  useEffect(() => {
    const count = MOCK_NOTIFICATIONS.filter(notif => !notif.isRead).length;
    setUnreadCount(count);
  }, []);
  
  // Ensure sites are loaded - use MOCK_SITES as fallback if sites is empty
  useEffect(() => {
    if (sites && sites.length > 0) {
      setDisplaySites(sites);
    } else {
      setDisplaySites(MOCK_SITES as Site[]);
    }
  }, [sites]);
  
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };
  
  const handleSiteNavigation = (url: string) => {
    // Open in a new tab for external URLs
    window.open(`https://${url}`, '_blank');
    // Close the bottom sheet
    setIsBottomSheetOpen(false);
  };
  
  return (
    <>
      <header className="sticky top-0 bg-background border-b border-border z-50">
        <div className="flex justify-between items-center pr-3 pl-0 py-2">
          <div className="flex items-center">
            <CommunityMenu />
            <div className="flex items-center gap-2 ml-2">
              <div className="rounded-lg overflow-hidden w-6 h-6 flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1493690283958-32df2c86326e?w=400&h=400&fit=crop" 
                  alt="ES Fitness Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={toggleBottomSheet}
                className="flex items-center gap-1"
              >
                <h1 className="text-base font-bold text-foreground">ES Fitness</h1>
                <ChevronDown className="w-3.5 h-3.5 text-foreground" />
              </button>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <button 
              className="h-7 w-7 text-primary hover:text-primary/80 transition-colors relative flex items-center justify-center rounded-full"
              onClick={() => navigate("/messages")}
            >
              <MessageCircle className="w-5 h-5" />
              <NotificationBadge count={4} />
            </button>
            <button 
              className="h-7 w-7 text-primary hover:text-primary/80 transition-colors relative flex items-center justify-center rounded-full"
              onClick={() => navigate("/notifications")}
            >
              <BellIcon className="w-5 h-5" />
              <NotificationBadge count={unreadCount} />
            </button>
            <button 
              className="h-7 w-7 flex items-center justify-center"
              onClick={() => navigate("/profile")}
            >
              <Avatar className="h-6 w-6 border-2 border-primary">
                <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
                <AvatarFallback>DJ</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </header>
      
      {/* Bottom Sheet */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={toggleBottomSheet}>
          <div 
            className="bg-background rounded-t-xl w-full max-h-[80vh] overflow-y-auto p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Switch Community</h2>
              <button 
                onClick={toggleBottomSheet}
                className="p-1 rounded-full hover:bg-muted/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Current Site */}
            <div className="mb-6 p-3 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1493690283958-32df2c86326e?w=400&h=400&fit=crop" alt="ES Fitness" />
                  <AvatarFallback>ES</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">ES Fitness</span>
                  <span className="text-xs text-muted-foreground">www.esfitness.com</span>
                </div>
              </div>
            </div>
            
            {/* Sites List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm text-muted-foreground">YOUR COMMUNITIES</h3>
              </div>
              
              <div className="space-y-3">
                {displaySites.map((site) => (
                  <div key={site.id} className="group relative">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 hover:bg-muted/50"
                      onClick={() => handleSiteNavigation(site.url)}
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={site.logo} alt={site.name} />
                        <AvatarFallback>{site.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{site.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {site.url}
                        </span>
                      </div>
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* Add New Site Button */}
              <Button 
                variant="outline" 
                className="w-full mt-4 gap-2"
                onClick={() => {
                  toggleBottomSheet();
                  // This would typically open a dialog to add a new site
                  // For now we just close the sheet
                }}
              >
                <Plus className="h-4 w-4" />
                Add New Community
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};