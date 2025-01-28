import { Link, useLocation } from "react-router-dom";

export const CommunityTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { name: "Teams", path: "/community/teams", isNew: true },
    { name: "Feed", path: "/community" },
    { name: "Challenges", path: "/community/challenges" },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex gap-8 px-4">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`relative py-4 ${
              currentPath === tab.path
                ? "text-black border-b-2 border-black"
                : "text-gray-600"
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.name}
              {tab.isNew && (
                <span className="bg-accent text-xs px-2 py-0.5 rounded-full text-black">
                  NEW
                </span>
              )}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};