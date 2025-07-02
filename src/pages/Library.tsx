import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, MessageCircle, Search, ChevronDown, X, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MOCK_NOTIFICATIONS } from '@/data/mockNotifications';
import { NotificationBadge } from '@/components/notifications/NotificationBadge';
import { useMenuPreferences, Site } from '@/context/MenuPreferencesContext';
import { MOCK_SITES } from '@/data/mock-sites';
import { useUIPreferences } from '@/context/UIPreferences';

const LibraryHeader = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { sites } = useMenuPreferences();
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
  
  const handleSiteNavigation = (url: string) => {
    // Open in a new tab for external URLs
    window.open(`https://${url}`, '_blank');
    // Close the bottom sheet
    setIsBottomSheetOpen(false);
  };
  
  return (
    <>
      <header className="sticky top-0 bg-background border-b border-border z-50">
        <div className="flex justify-between items-center px-2 py-2">
          <div className="flex items-center">
            <div className="flex items-center gap-2 pl-1">
              <div className="rounded-lg overflow-hidden w-6 h-6 border border-primary flex-shrink-0">
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
          <div className="flex gap-2 items-center">
            <button 
              className="p-1 text-primary hover:text-primary/80 transition-colors flex items-center justify-center"
              onClick={() => navigate("/search")}
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              className="p-1 text-primary hover:text-primary/80 transition-colors relative flex items-center justify-center"
              onClick={() => navigate("/messages")}
            >
              <MessageCircle className="w-4 h-4" />
              <NotificationBadge count={4} />
            </button>
            <button 
              className="p-1 text-primary hover:text-primary/80 transition-colors relative flex items-center justify-center"
              onClick={() => navigate("/notifications")}
            >
              <BellIcon className="w-4 h-4" />
              <NotificationBadge count={unreadCount} />
            </button>
            <button 
              className="ml-1"
              onClick={() => navigate("/profile")}
            >
              <Avatar className="h-7 w-7 border-2 border-primary">
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
            <div className="flex justify-between items-center p-4 border-b border-border flex-shrink-0">
              <h2 className="font-semibold text-lg">Site Switcher</h2>
              <button 
                onClick={toggleBottomSheet}
                className="p-1 rounded-full hover:bg-muted/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Current Site */}
              <div className="mb-6 p-3 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src="https://images.unsplash.com/photo-1493690283958-32df2c86326e?w=400&h=400&fit=crop" alt="ES Fitness" />
                    <AvatarFallback>ES</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">ES Fitness</span>
                    <span className="text-xs text-muted-foreground">Library • www.esfitness.com</span>
                  </div>
                </div>
              </div>
              
              {/* Sites List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm text-muted-foreground">YOUR SITES</h3>
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
              </div>
            </div>
            
            {/* Sticky Bottom CTA */}
            <div className="p-4 border-t border-border flex-shrink-0">
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => {
                  toggleBottomSheet();
                  // This would typically open a dialog to add a new site
                  // For now we just close the sheet
                }}
              >
                <Plus className="h-4 w-4" />
                Add More Sites
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Library navigation tabs component
const LibraryTabs = () => {
  return (
    <div className="border-b border-border">
      <nav className="overflow-x-auto flex gap-8 px-4">
        <a
          href="#courses"
          className="relative py-4 whitespace-nowrap text-foreground border-b-2 border-primary"
        >
          Courses
        </a>
        <a
          href="#coaching"
          className="relative py-4 whitespace-nowrap text-muted-foreground hover:text-foreground"
        >
          Coaching
        </a>
        <a
          href="#podcasts"
          className="relative py-4 whitespace-nowrap text-muted-foreground hover:text-foreground"
        >
          Podcasts
        </a>
      </nav>
    </div>
  );
};

const LibraryContent = () => {
  return (
    <>
      <section id="courses">
        <h2 className="sr-only">Courses</h2>
        <div className="space-y-6 p-4">
          <section>
            <h3 className="text-lg font-semibold mb-3">Recent Courses</h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-lg overflow-hidden border border-border">
                  <div className="aspect-video bg-muted relative">
                    <img 
                      src={`https://images.unsplash.com/photo-15871935${item}1454-1cb2f99b2d8b?w=400&h=300&fit=crop`} 
                      alt={`Course ${item}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-background rounded-full p-1">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-2">
                    <h4 className="font-medium text-sm truncate">Fitness Course {item}</h4>
                    <p className="text-xs text-muted-foreground">5 videos • 2h 30m</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-3">Saved Videos</h3>
            <div className="grid grid-cols-2 gap-3">
              {[5, 6, 7, 8].map((item) => (
                <div key={item} className="rounded-lg overflow-hidden border border-border">
                  <div className="aspect-video bg-muted">
                    <img 
                      src={`https://images.unsplash.com/photo-15751${item}814086-f385e2e2ad1b?w=400&h=300&fit=crop`} 
                      alt={`Video ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h4 className="font-medium text-sm truncate">Exercise Tutorial {item}</h4>
                    <p className="text-xs text-muted-foreground">15 minutes</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

const LibraryPage = () => {
  return (
    <div className="flex flex-col flex-1 min-w-[375px]">
      <LibraryHeader />
      <LibraryTabs />
      {/* Invisible placeholder to maintain layout width */}
      <div className="w-full min-w-[375px] h-2 bg-secondary/50"></div>
      <main className="w-full">
        <LibraryContent />
      </main>
    </div>
  );
};

export default LibraryPage; 