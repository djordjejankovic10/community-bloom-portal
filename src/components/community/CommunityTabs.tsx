import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { CategoryCircles } from "./CategoryCircles";

interface CommunityTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const CommunityTabs = ({ activeFilter, onFilterChange }: CommunityTabsProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { name: "Feed", path: "/community" },
    { name: "Challenges", path: "/community/challenges" },
    { name: "Meetups", path: "/community/meetups" },
    { name: "Leaderboard", path: "/community/leaderboard" },
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
      
      <CategoryCircles 
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};