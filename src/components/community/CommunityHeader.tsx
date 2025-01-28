import { BellIcon, MessageCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CommunityHeader = () => {
  return (
    <header className="px-4 py-2 border-b border-border">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Community</h1>
        </div>
        <div className="flex gap-4">
          <button className="p-2 text-foreground hover:text-primary">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="p-2 text-foreground hover:text-primary">
            <BellIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};