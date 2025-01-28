import { Link, useLocation } from "react-router-dom";

export const CommunityTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { name: "Feed", path: "/community" },
    { name: "Challenges", path: "/community/challenges" },
    { name: "Meetups", path: "/community/meetups" },
    { name: "Leaderboard", path: "/community/leaderboard" },
  ];

  return (
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
  );
};