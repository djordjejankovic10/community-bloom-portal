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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className={`p-2 rounded-full ${
                isActive(item.path)
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
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