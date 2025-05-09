import { useUIPreferences } from "@/context/UIPreferences"; 
import { CommunityTabs } from "./CommunityTabs";

interface ConditionalCommunityTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ConditionalCommunityTabs = (props: ConditionalCommunityTabsProps) => {
  const { showNavigation } = useUIPreferences();
  
  if (!showNavigation) {
    return null;
  }
  
  return <CommunityTabs {...props} showFilters={true} />;
}; 