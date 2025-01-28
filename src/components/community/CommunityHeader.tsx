import { BellIcon, UserPlusIcon } from "lucide-react";

export const CommunityHeader = () => {
  return (
    <header className="px-4 py-2 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Community</h1>
        <div className="flex gap-4">
          <button className="p-2">
            <UserPlusIcon className="w-6 h-6" />
          </button>
          <button className="p-2">
            <BellIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};