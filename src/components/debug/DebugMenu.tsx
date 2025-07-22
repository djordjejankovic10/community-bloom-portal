import { Moon, Palette, ArrowLeft, Layout, AtSign, Code, Sun } from "lucide-react";
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
import { MentionToggle } from "@/components/settings/MentionToggle";

/**
 * DebugMenu Component
 * 
 * UX Notes: Development-only component containing all debug features and settings
 * that are useful for development but not part of the final user experience.
 * This keeps development tools separate from the real profile interface.
 */
const DebugMenu = () => {
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
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Toggling theme from", theme, "to", newTheme);
    setTheme(newTheme);
  };

  // Color theme options
  const colorOptions = [
    { name: "Purple", value: "#9b87f5", class: "bg-purple-500" },
    { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
    { name: "Green", value: "#10b981", class: "bg-green-500" },
    { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
    { name: "Orange", value: "#f97316", class: "bg-orange-500" },
    { name: "Red", value: "#ef4444", class: "bg-red-500" },
  ];

  // Monitor theme changes
  useEffect(() => {
    console.log("Theme changed to:", theme);
    console.log("HTML class list:", document.documentElement.classList.toString());
  }, [theme]);

  // Apply color theme to CSS variables
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const color = primaryColor;
      
      // Convert hex to HSL for CSS custom properties
      const hexToHsl = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }

        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
      };

      root.style.setProperty('--primary', hexToHsl(color));
    }
  }, [primaryColor]);

  return (
    <div className="min-h-screen w-full max-w-none flex flex-col" style={{ backgroundColor: 'var(--figma-background)' }}>
      <div className="flex items-center justify-between border-b p-4 shrink-0 w-full" style={{ borderBottomColor: 'var(--figma-border)' }}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" style={{ color: 'var(--figma-text-primary)' }} />
        </Button>
        <div className="font-semibold flex items-center gap-2" style={{ color: 'var(--figma-text-primary)' }}>
          <Code className="h-4 w-4" style={{ color: 'var(--figma-text-primary)' }} />
          Debug Menu
        </div>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex-1 w-full overflow-y-auto p-6 space-y-6 max-w-none">
        
        {/* Theme Settings */}
        <div className="space-y-4 w-full">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--figma-text-primary)' }}>Theme Settings</h2>
          
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

          {/* Theme selector */}
          <div className="py-3 border-b">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="h-4 w-4" />
              <Label className="font-medium text-foreground">Theme Mode</Label>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Choose your preferred theme mode
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" }, 
                { value: "system", label: "System" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "py-2 px-3 rounded-lg border text-sm font-medium transition-colors",
                    theme === option.value 
                      ? "border-primary bg-primary text-primary-foreground" 
                      : "border-muted hover:bg-muted"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color theme section */}
          <div className="py-3 border-b">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4" />
              <Label className="font-medium text-foreground">Primary Color</Label>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Choose your preferred accent color for the interface
            </p>
            
            <div className="grid grid-cols-3 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setPrimaryColor(color.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors",
                    primaryColor === color.value 
                      ? "border-primary bg-primary/5" 
                      : "border-muted hover:border-muted-foreground/20"
                  )}
                >
                  <div className={cn("w-8 h-8 rounded-full", color.class)} />
                  <span className="text-xs font-medium">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* UI Preferences */}
        <div className="space-y-4 w-full">
                          <h2 className="text-lg font-semibold" style={{ color: 'var(--figma-text-primary)' }}>UI Preferences</h2>
          
          {/* Navigation toggle */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <Label 
                htmlFor="navigation-toggle" 
                className="font-medium text-foreground"
              >
                <div className="flex items-center gap-1.5">
                  <Layout className="h-4 w-4" />
                  <span>Show Feed Navigation</span>
                </div>
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Toggle visibility of the feed navigation controls
              </p>
            </div>
            <Switch 
              id="navigation-toggle" 
              checked={showNavigation} 
              onCheckedChange={handleNavigationToggle} 
            />
          </div>

          {/* Sites list toggle */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <Label 
                htmlFor="sites-toggle" 
                className="font-medium text-foreground"
              >
                Show Sites List
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Toggle the sites list in the side menu
              </p>
            </div>
            <Switch 
              id="sites-toggle" 
              checked={showSitesList} 
              onCheckedChange={toggleSitesList} 
            />
          </div>

          {/* Mention menu style toggle */}
          <div className="py-3 border-b">
            <div className="flex items-center justify-between">
              <div>
                <Label 
                  htmlFor="mention-toggle" 
                  className="font-medium text-foreground"
                >
                  <div className="flex items-center gap-1.5">
                    <AtSign className="h-4 w-4" />
                    <span>Mention Menu Style</span>
                  </div>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose how the @mention menu appears when typing
                </p>
              </div>
              <MentionToggle />
            </div>
          </div>
        </div>

        {/* Development Info */}
        <div className="space-y-4 w-full">
                          <h2 className="text-lg font-semibold" style={{ color: 'var(--figma-text-primary)' }}>Development Info</h2>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This debug menu contains development-only features and settings. 
              These tools help with testing and development but won't be visible 
              in the production app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugMenu; 