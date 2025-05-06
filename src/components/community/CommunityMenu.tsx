import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Plus, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { useMenuPreferences, Site } from "@/context/MenuPreferencesContext";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_SITES } from "@/data/mock-sites";

const MOCK_MEMBERS = [
  {
    name: "David",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format",
  },
  {
    name: "Sarah",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&auto=format",
  },
  {
    name: "Mike",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces&auto=format",
  },
  {
    name: "Lisa",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&auto=format",
  },
];

// Available logos for new sites
const AVAILABLE_LOGOS = [
  "/site-logos/bloom.png",
  "/site-logos/creative.png",
  "/site-logos/data.png",
  "/site-logos/leadership.png",
  "/site-logos/design.png",
  "/site-logos/dev.png",
  "/site-logos/marketing.png",
  "/site-logos/product.png",
  "/site-logos/ux.png",
];

export const CommunityMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { showSitesList, sites, addSite, removeSite } = useMenuPreferences();
  
  // Form state for adding new site
  const [newSiteName, setNewSiteName] = useState("");
  const [newSiteUrl, setNewSiteUrl] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Ensure sites are loaded - use MOCK_SITES as fallback if sites is empty
  const [displaySites, setDisplaySites] = useState<Site[]>([]);
  
  useEffect(() => {
    console.log("Sites from context:", sites);
    if (sites && sites.length > 0) {
      setDisplaySites(sites);
    } else {
      console.log("Using mock sites as fallback");
      setDisplaySites(MOCK_SITES as Site[]);
    }
  }, [sites]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSiteNavigation = (url: string) => {
    // Open in a new tab for external URLs
    window.open(`https://${url}`, '_blank');
  };

  const handleAddSite = () => {
    if (newSiteName && newSiteUrl) {
      // Generate random logo and fallback
      const randomLogo = AVAILABLE_LOGOS[Math.floor(Math.random() * AVAILABLE_LOGOS.length)];
      const fallback = newSiteName.substring(0, 2).toUpperCase();
      
      addSite({
        name: newSiteName,
        url: newSiteUrl,
        logo: randomLogo,
        fallback,
      });
      
      // Reset form
      setNewSiteName("");
      setNewSiteUrl("");
      setDialogOpen(false);
    }
  };

  const renderNavigationMenu = () => (
    <div className="p-4 space-y-2">
      <SheetClose asChild>
        <Button 
          variant={currentPath === "/community" ? "secondary" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleNavigation("/community")}
        >
          Feed
        </Button>
      </SheetClose>
      
      <SheetClose asChild>
        <Button 
          variant={currentPath === "/community/challenges" ? "secondary" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleNavigation("/community/challenges")}
        >
          Challenges
        </Button>
      </SheetClose>
      
      <SheetClose asChild>
        <Button 
          variant={currentPath === "/community/meetups" ? "secondary" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleNavigation("/community/meetups")}
        >
          Meetups
        </Button>
      </SheetClose>
      
      <SheetClose asChild>
        <Button 
          variant={currentPath === "/community/leaderboard" ? "secondary" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleNavigation("/community/leaderboard")}
        >
          Leaderboard
        </Button>
      </SheetClose>
    </div>
  );

  const renderSitesList = () => (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-medium text-sm text-muted-foreground">YOUR SITES</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Site</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Site Name</Label>
                <Input 
                  id="name" 
                  value={newSiteName} 
                  onChange={(e) => setNewSiteName(e.target.value)} 
                  placeholder="My Community"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Site URL</Label>
                <Input 
                  id="url" 
                  value={newSiteUrl} 
                  onChange={(e) => setNewSiteUrl(e.target.value)} 
                  placeholder="www.example.com"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddSite} disabled={!newSiteName || !newSiteUrl}>
                Add Site
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {displaySites.map((site) => (
        <div key={site.id} className="group relative">
          <SheetClose asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 pr-8"
              onClick={() => handleSiteNavigation(site.url)}
            >
              <Avatar className="h-8 w-8">
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
          </SheetClose>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              removeSite(site.id);
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {site.name}</span>
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[350px] max-w-[350px] p-0">
        <div className="flex flex-col h-full">
          {/* Conditional rendering of header image and profile */}
          {!showSitesList && (
            <>
              {/* Header Image */}
              <div className="h-32 bg-muted relative">
                <img
                  src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8"
                  alt="Community header"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Section */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop" />
                    <AvatarFallback>DJ</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">David Johnson</span>
                    <span className="text-sm text-muted-foreground">@davidj</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Sites list title when in sites mode */}
          {showSitesList && (
            <div className="p-4 border-b">
              <h1 className="text-xl font-semibold">Switch Sites</h1>
            </div>
          )}

          {/* Conditional Content */}
          {showSitesList ? (
            // Sites List View
            renderSitesList()
          ) : (
            <>
              {/* Community Info */}
              <div className="p-4 space-y-4 border-b">
                <h2 className="text-xl font-semibold">Community</h2>
                <p className="text-sm text-muted-foreground">
                  This is a detailed description of our fitness community where members can share their journey, achievements, and support each other.
                </p>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-0 h-auto hover:bg-transparent"
                  onClick={() => {
                    navigate("/community/members");
                  }}
                >
                  <div className="flex -space-x-3">
                    {MOCK_MEMBERS.map((member, i) => (
                      <Avatar 
                        key={i} 
                        className="h-8 w-8 border-2 border-background ring-0"
                      >
                        <AvatarImage 
                          src={member.image} 
                          alt={member.name}
                          className="object-cover"
                        />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border-2 border-background text-sm font-medium">
                      +45
                    </div>
                  </div>
                </Button>
              </div>

              {/* Navigation Menu */}
              {renderNavigationMenu()}
            </>
          )}

          {/* Live Button */}
          <div className="p-4 mt-auto border-t">
            <Button className="w-full" variant="outline">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};