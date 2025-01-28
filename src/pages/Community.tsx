import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { BottomNav } from "@/components/layout/BottomNav";

const Community = () => {
  return (
    <div className="min-h-screen pb-20">
      <CommunityHeader />
      <CommunityTabs />
      <main className="p-4">
        {/* Feed content will go here in the next iteration */}
        <div className="text-center text-gray-500 mt-8">
          Feed content coming soon...
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Community;