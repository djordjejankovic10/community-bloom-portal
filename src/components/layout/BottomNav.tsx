import { Home, Play, Activity, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, path: "/" },
    { icon: Play, path: "/library", comingSoon: true },
    { icon: Activity, path: "/community" },
    { icon: Users, path: "/teams", comingSoon: true },
    { icon: User, path: "/profile" },
  ];

  const renderNavItem = (item: typeof navItems[0], index: number) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    const link = (
      <Link
        key={index}
        to={item.comingSoon ? "#" : item.path}
        onClick={(e) => item.comingSoon && e.preventDefault()}
        className={`p-2 rounded-full transition-colors ${
          active
            ? "bg-[#8B5CF6] text-white hover:bg-[#7c4deb] shadow-md"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Icon className="w-6 h-6" />
      </Link>
    );

    if (item.comingSoon) {
      return (
        <Tooltip key={index}>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent>
            <p>Coming Soon</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return link;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 transition-colors">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item, index) => renderNavItem(item, index))}
      </div>
    </nav>
  );
};