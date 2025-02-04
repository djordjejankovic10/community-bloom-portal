import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";

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

export const CommunityMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[350px] max-w-[350px] p-0">
        <div className="flex flex-col h-full">
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