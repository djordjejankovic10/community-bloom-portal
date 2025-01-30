import { BellIcon, MessageCircle, Search } from "lucide-react";
import { CommunityMenu } from "./CommunityMenu";

export const CommunityHeader = () => {
  return (
    <header className="sticky top-0 bg-background border-b border-border z-50">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <CommunityMenu />
          <h1 className="text-2xl font-bold text-foreground">Community</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 text-primary hover:text-primary/80 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-1.5 text-primary hover:text-primary/80 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="p-1.5 text-primary hover:text-primary/80 transition-colors">
            <BellIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};