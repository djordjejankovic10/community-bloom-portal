import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "react-router-dom";

export const CommunityMenu = () => {
  const location = useLocation();

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
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-3 text-sm text-muted-foreground hover:text-foreground">
                <Users className="h-4 w-4 mr-2" />
                <span className="font-semibold text-foreground">49</span> Members
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Feed
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Challenges
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Meetups
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Leaderboard
            </Button>
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