import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUIPreferences } from "@/context/UIPreferences";

export const NavigationToggle = () => {
  const { showNavigation, toggleNavigation } = useUIPreferences();

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <Label htmlFor="navigation-toggle" className="font-medium">Show Navigation</Label>
      <Switch 
        id="navigation-toggle" 
        checked={showNavigation} 
        onCheckedChange={toggleNavigation} 
      />
    </div>
  );
}; 