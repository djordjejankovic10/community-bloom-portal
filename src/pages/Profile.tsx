import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import { BottomNav } from "@/components/layout/BottomNav";

const Profile = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log("Theme toggled:", theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>
      
      <div className="p-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5" />
            <span>Dark Mode</span>
          </div>
          <Toggle
            pressed={theme === "dark"}
            onPressedChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;