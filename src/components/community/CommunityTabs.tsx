import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const FILTERS = [
  "All",
  "Weight Training",
  "Cardio",
  "Yoga",
  "Nutrition",
  "Recovery",
];

export const CommunityTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeFilter, setActiveFilter] = useState("All");

  const tabs = [
    { name: "Feed", path: "/community" },
    { name: "Challenges", path: "/community/challenges" },
    { name: "Meetups", path: "/community/meetups" },
    { name: "Leaderboard", path: "/community/leaderboard" },
  ];

  return (
    <div>
      <div className="border-b border-border">
        <nav className="flex gap-8 px-4">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.path}
              className={`relative py-4 ${
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
      
      <div className="overflow-x-auto px-4 py-3 flex gap-2 bg-secondary/50">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-background/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};