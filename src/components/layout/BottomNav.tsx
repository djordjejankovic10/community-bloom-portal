import { Home, Play, Activity, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, path: "/" },
    { icon: Play, path: "/library" },
    { icon: Activity, path: "/community" },
    { icon: Users, path: "/teams" },
    { icon: User, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 transition-colors">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className={`p-2 rounded-full transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-primary hover:text-primary/80"
              }`}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};