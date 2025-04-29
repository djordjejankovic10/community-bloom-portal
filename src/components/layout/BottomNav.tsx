import { Home, BookOpen, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <div className="flex justify-around">
        <Link 
          to="/" 
          className={`flex flex-col items-center py-2 px-4 ${path === "/" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link 
          to="/library" 
          className={`flex flex-col items-center py-2 px-4 ${path.includes("/library") ? "text-primary" : "text-muted-foreground"}`}
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-xs mt-1">Library</span>
        </Link>
        <Link 
          to="/community" 
          className={`flex flex-col items-center py-2 px-4 ${path.includes("/community") ? "text-primary" : "text-muted-foreground"}`}
        >
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Community</span>
        </Link>
      </div>
    </div>
  );
};