import { Moon, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { BottomNav } from "@/components/layout/BottomNav";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState("#8B5CF6"); // Default vivid purple

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log("Theme toggled:", theme === "dark" ? "light" : "dark");
  };

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
    // Convert hex to HSL
    const root = document.documentElement;
    root.style.setProperty('--primary', convertHexToHSL(color));
    console.log("Primary color changed to:", color);
  };

  // Convert hex color to HSL format
  const convertHexToHSL = (hex: string) => {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      
      h *= 60;
    }

    // Return the HSL values in the format Tailwind CSS uses
    return `${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
  };

  // Set initial color on mount
  useEffect(() => {
    handleColorChange(primaryColor);
  }, []);

  const colorOptions = [
    { value: "#8B5CF6", label: "Vivid Purple" },
    { value: "#9b87f5", label: "Primary Purple" },
    { value: "#E5DEFF", label: "Soft Purple" },
    { value: "#1EAEDB", label: "Bright Blue" },
    { value: "#D946EF", label: "Magenta Pink" },
  ];

  return (
    <div className="min-h-screen pb-20">
      <header className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>
      
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5" />
            <span className="font-medium">Dark Mode</span>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5" />
            <span className="font-medium">Theme Color</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`w-full aspect-square rounded-lg border-2 transition-all ${
                  primaryColor === color.value ? 'border-primary scale-110' : 'border-transparent scale-100'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.label}
                aria-label={`Set theme color to ${color.label}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;