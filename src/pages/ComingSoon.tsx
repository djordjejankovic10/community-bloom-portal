import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarClock } from "lucide-react";

const ComingSoonPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which section we're showing "Coming Soon" for
  const getPageTitle = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/library") return "Library";
    return "This Feature";
  };
  
  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b bg-background/80 backdrop-blur-sm z-10 sticky top-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate("/community")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-xl">{getPageTitle()}</h1>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CalendarClock className="h-10 w-10 text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          We're working hard to bring you an amazing {getPageTitle().toLowerCase()} experience. 
          Check back soon for updates!
        </p>
        
        <Button onClick={() => navigate("/community")}>
          Go to Community
        </Button>
      </div>
    </div>
  );
};

export default ComingSoonPage;
