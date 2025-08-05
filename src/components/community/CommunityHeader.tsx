import { BellIcon, MessageCircle, User, ChevronDown, X, Plus, Check, Settings } from "lucide-react";
import { CommunityMenu } from "./CommunityMenu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MOCK_NOTIFICATIONS } from "@/data/mockNotifications";
import { NotificationBadge } from "@/components/notifications/NotificationBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMenuPreferences, Site } from "@/context/MenuPreferencesContext";
import { MOCK_SITES } from "@/data/mock-sites";
import { Button } from "@/components/ui/button";
import { useUIPreferences } from "@/context/UIPreferences";

export const CommunityHeader = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { sites, selectedSiteId, setSelectedSite } = useMenuPreferences();
  const { setHideBottomNav } = useUIPreferences();
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

  // Hide/show bottom navigation when site switcher opens/closes
  useEffect(() => {
    setHideBottomNav(isBottomSheetOpen);
    return () => {
      setHideBottomNav(false);
    };
  }, [isBottomSheetOpen, setHideBottomNav]);
  
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };
  
  const handleSiteNavigation = (site: Site) => {
    // Set as selected site
    setSelectedSite(site.id);
    // Open in a new tab for external URLs
    window.open(`https://${site.url}`, '_blank');
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
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end" onClick={toggleBottomSheet}>
          <div 
            className="bg-background rounded-t-xl w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="flex justify-between items-center p-4 flex-shrink-0">
              <h2 className="font-semibold text-xl">Sites</h2>
              <button 
                onClick={toggleBottomSheet}
                className="p-1 rounded-full hover:bg-muted/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
                        {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4">
              {/* Sites List */}
              <div className="space-y-2.5 pb-4">
                {displaySites.map((site) => (
                  <div 
                    key={site.id} 
                    className="flex items-center gap-4 p-0 cursor-pointer rounded-md"
                    onClick={() => handleSiteNavigation(site)}
                  >
                    <div className="w-[52px] h-[52px] rounded-lg flex-shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img 
                        src={site.logo} 
                        alt={site.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to showing the first letter with unique colors per site
                          const colors = [
                            'from-blue-500 to-purple-600',      // Fitness Community - Blue/Purple
                            'from-green-500 to-teal-600',       // Tech Enthusiasts - Green/Teal
                            'from-orange-500 to-red-600',       // Book Club - Orange/Red
                            'from-pink-500 to-rose-600',        // Photography Hub - Pink/Rose
                            'from-indigo-500 to-purple-600',    // Art & Design - Indigo/Purple
                            'from-yellow-500 to-orange-600',    // Music Producers - Yellow/Orange
                            'from-emerald-500 to-green-600',    // Cooking Club - Emerald/Green
                            'from-cyan-500 to-blue-600',        // Travel Buddies - Cyan/Blue
                            'from-lime-500 to-green-600',       // Gardening Group - Lime/Green
                            'from-violet-500 to-purple-600'     // DIY Projects - Violet/Purple
                          ];
                          const colorIndex = parseInt(site.id) - 1;
                          const colorClass = colors[colorIndex] || 'from-gray-500 to-gray-600';
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-lg">${site.name.charAt(0)}</div>`;
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#343332] text-[16px] leading-5 tracking-[0.16px] truncate">
                        {site.name}
                      </div>
                      <div className="font-medium text-[#6c6a69] text-[12px] leading-[17px] truncate">
                        http://address.com/site
                      </div>
                    </div>
                    {selectedSiteId === site.id && (
                      <div className="w-6 h-6 flex-shrink-0">
                        <Check className="w-6 h-6 text-red-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Manage Sites - Always visible at bottom */}
            <div className="border-t border-border bg-background px-4 py-4 flex-shrink-0">
              <div 
                className="flex items-center gap-[11px] cursor-pointer p-2.5 hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => {
                  toggleBottomSheet();
                  navigate('/settings/manage-sites');
                }}
              >
                <Settings className="w-5 h-5 text-[#343332]" />
                <span className="font-medium text-[14px] text-[#343332] tracking-[-0.16px]">
                  Manage sites
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};