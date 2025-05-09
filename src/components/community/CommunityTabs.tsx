import { Link, useLocation } from "react-router-dom";
import { 
  Layout, 
  Dumbbell, 
  Heart, 
  StretchVertical, 
  Apple, 
  Battery 
} from "lucide-react";

interface CommunityTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  showFilters?: boolean;
}

export const CommunityTabs = ({ activeFilter, onFilterChange, showFilters = true }: CommunityTabsProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { name: "Feed", path: "/community" },
    { name: "Challenges", path: "/community/challenges" },
    { name: "Meetups", path: "/community/meetups" },
    { name: "Resources", path: "/community/resources" },
    { name: "Welcome", path: "/community/welcome" },
    { name: "Leaderboard", path: "/community/leaderboard" },
  ];

  // Filter categories based on the ones from CategoryCircles
  const filterCategories = [
    { id: "all", name: "All", icon: Layout },
    { id: "weight-training", name: "Weight Training", icon: Dumbbell },
    { id: "cardio", name: "Cardio", icon: Heart },
    { id: "yoga", name: "Yoga", icon: StretchVertical },
    { id: "nutrition", name: "Nutrition", icon: Apple },
    { id: "recovery", name: "Recovery", icon: Battery }
  ];

  return (
    <div>
      <div className="border-b border-border">
        <nav className="overflow-x-auto flex gap-8 px-4">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.path}
              className={`relative py-4 whitespace-nowrap ${
                currentPath === tab.path
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* New horizontal filter bar, styled like the search filters */}
      {showFilters && (
        <div className="px-2 py-2 overflow-x-auto bg-secondary/50">
          <div className="flex gap-1 min-w-max">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onFilterChange(category.id)}
                className={`px-4 py-2 text-sm rounded-md whitespace-nowrap flex items-center gap-2 ${
                  activeFilter === category.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};