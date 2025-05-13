import { Moon, Palette, ArrowLeft, Layout } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUIPreferences } from "@/context/UIPreferences";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMenuPreferences } from "@/context/MenuPreferencesContext";

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [primaryColor, setPrimaryColor] = useState("#9b87f5");
  
  // Access UI preferences context
  const { showNavigation, toggleNavigation } = useUIPreferences();
  
  // Add this back - for the side menu toggle
  let showSitesList = false;
  let toggleSitesList = () => {};
  try {
    const menuPrefs = useMenuPreferences();
    showSitesList = menuPrefs.showSitesList;
    toggleSitesList = menuPrefs.toggleSitesList;
  } catch (error) {
    console.warn("MenuPreferences context not available");
  }

  // Create an explicit handler for the navigation toggle
  const handleNavigationToggle = () => {
    // Call the context function directly
    toggleNavigation();
    console.log("Navigation toggled, new state:", !showNavigation);
  };

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
    // Convert hex to HSL
    const root = document.documentElement;
    
    // Apply different color adjustments for dark mode
    if (theme === 'dark') {
      // For dark mode: preserve hue, reduce lightness, increase saturation
      // This follows Superhuman's recommendation for deepening colors in dark themes
      const darkModeHSL = convertHexToHSLDarkMode(color);
      root.style.setProperty('--primary', darkModeHSL);
    } else {
      // For light mode: use standard conversion
      root.style.setProperty('--primary', convertHexToHSL(color));
    }
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
    let h = 0, s = 0;
    const l = (max + min) / 2;

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
  
  // Special version for dark mode that deepens colors
  const convertHexToHSLDarkMode = (hex: string) => {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

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
    
    // Dark mode adjustments:
    // 1. Preserve hue
    // 2. Increase saturation by 10-15% (capped at 100%)
    // 3. Reduce lightness by 10-15% (to avoid too bright colors)
    const adjustedS = Math.min(s * 1.15, 1); // Increase saturation by 15%
    const adjustedL = Math.max(l * 0.85, 0.3); // Reduce lightness but keep it visible
    
    // Return the HSL values in the format Tailwind CSS uses
    return `${h.toFixed(1)} ${(adjustedS * 100).toFixed(1)}% ${(adjustedL * 100).toFixed(1)}%`;
  };

  // Set initial color on mount
  useEffect(() => {
    handleColorChange(primaryColor);
  }, []);
  
  // Update color when theme changes
  useEffect(() => {
    handleColorChange(primaryColor);
  }, [theme]);

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
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center gap-4 p-3 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold flex-1">Settings</h1>
      </header>

      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">App Preferences</h2>
        
        <div className="space-y-4">
          {/* Add back the side menu toggle */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <Label 
                htmlFor="side-menu-toggle" 
                className="font-medium text-foreground"
              >
                Show Side Navigation
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Show sites list in the side navigation menu
              </p>
            </div>
            
            {/* Side menu toggle */}
            <div className="relative">
              <input
                id="side-menu-toggle"
                type="checkbox"
                checked={showSitesList}
                onChange={() => {
                  toggleSitesList();
                  console.log("Side menu toggle clicked");
                }}
                className="sr-only"
              />
              <label
                htmlFor="side-menu-toggle"
                className={`block w-11 h-6 rounded-full cursor-pointer ${
                  showSitesList ? 'bg-primary' : 'bg-input'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform duration-200 ${
                    showSitesList ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </label>
            </div>
          </div>
          
          {/* Feed navigation toggle - already implemented */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <Label 
                htmlFor="navigation-toggle" 
                className="font-medium text-foreground"
              >
                Show Feed Navigation
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Show tabs and category filters in the community feed
              </p>
            </div>
            
            {/* Feed navigation toggle - already implemented */}
            <div className="relative">
              <input
                id="navigation-toggle"
                type="checkbox"
                checked={showNavigation}
                onChange={() => {
                  toggleNavigation();
                }}
                className="sr-only"
              />
              <label
                htmlFor="navigation-toggle"
                className={`block w-11 h-6 rounded-full cursor-pointer ${
                  showNavigation ? 'bg-primary' : 'bg-input'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform duration-200 ${
                    showNavigation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </label>
            </div>
          </div>
          
          {/* Dark mode toggle */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <Label 
                htmlFor="dark-mode-toggle" 
                className="font-medium text-foreground"
              >
                Dark Mode
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Use dark theme throughout the app
              </p>
            </div>
            <Switch id="dark-mode-toggle" checked={theme === "dark"} onCheckedChange={toggleDarkMode} />
          </div>

          {/* Push notifications toggle */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <Label 
                htmlFor="notifications-toggle" 
                className="font-medium text-foreground"
              >
                Push Notifications
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Receive notifications for activity in your communities
              </p>
            </div>
            <Switch id="notifications-toggle" checked={true} />
          </div>
          
          {/* Color theme section */}
          <div className="py-3 border-b">
            <div className="mb-2">
              <h3 className="font-medium text-foreground">
                Primary Color
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Choose an accent color for the app
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {colorOptions.slice(0, 9).map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  className="w-8 h-8 rounded-full transition-all"
                  style={{ 
                    backgroundColor: color.value,
                    border: primaryColor === color.value ? '2px solid hsl(var(--foreground))' : '2px solid transparent'
                  }}
                  title={color.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;