import { Moon, Palette, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState("#9b87f5");
  const navigate = useNavigate();

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
    { value: "#9b87f5", label: "Primary Purple" },
    { value: "#8B5CF6", label: "Vivid Purple" },
    { value: "#E5DEFF", label: "Soft Purple" },
    { value: "#7E69AB", label: "Secondary Purple" },
    { value: "#6E59A5", label: "Tertiary Purple" },
    { value: "#D6BCFA", label: "Light Purple" },
    { value: "#F2FCE2", label: "Soft Green" },
    { value: "#FEF7CD", label: "Soft Yellow" },
    { value: "#FEC6A1", label: "Soft Orange" },
    { value: "#FFDEE2", label: "Soft Pink" },
    { value: "#FDE1D3", label: "Soft Peach" },
    { value: "#D3E4FD", label: "Soft Blue" },
    { value: "#1EAEDB", label: "Bright Blue" },
    { value: "#0EA5E9", label: "Ocean Blue" },
    { value: "#D946EF", label: "Magenta Pink" },
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-background p-4 space-y-4" style={{width: '100vw'}}>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between p-4 bg-card rounded-lg">
          <div className="flex items-center gap-3 text-card-foreground">
            <Moon className="w-5 h-5" />
            <span className="font-medium">Dark Mode</span>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
        </div>

        <div className="p-4 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4 text-card-foreground">
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
    </div>
  );
};

export default Profile;