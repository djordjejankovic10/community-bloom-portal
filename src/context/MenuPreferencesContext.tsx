import React, { createContext, useState, useContext, useEffect } from 'react';
import { MOCK_SITES } from '@/data/mock-sites';

export type Site = {
  id: string;
  name: string;
  url: string;
  logo: string;
  fallback: string;
};

type MenuPreferencesContextType = {
  showSitesList: boolean;
  toggleSitesList: () => void;
  sites: Site[];
  addSite: (site: Omit<Site, 'id'>) => void;
  removeSite: (id: string) => void;
  selectedSiteId: string | null;
  setSelectedSite: (id: string) => void;
};

const MenuPreferencesContext = createContext<MenuPreferencesContextType | undefined>(undefined);

export const MenuPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to false (not showing sites list)
  const [showSitesList, setShowSitesList] = useState(false);
  // Initialize with mock sites
  const [sites, setSites] = useState<Site[]>(MOCK_SITES as Site[]);
  // Selected site (default to first site)
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>("1");

  // Load preferences and sites from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('showSitesList');
    if (savedPreference !== null) {
      setShowSitesList(JSON.parse(savedPreference));
    }

    const savedSites = localStorage.getItem('sites');
    if (savedSites !== null) {
      setSites(JSON.parse(savedSites));
    }

    const savedSelectedSite = localStorage.getItem('selectedSiteId');
    if (savedSelectedSite !== null) {
      setSelectedSiteId(savedSelectedSite);
    }
  }, []);

  // Save preferences and sites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('showSitesList', JSON.stringify(showSitesList));
  }, [showSitesList]);

  useEffect(() => {
    localStorage.setItem('sites', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    if (selectedSiteId) {
      localStorage.setItem('selectedSiteId', selectedSiteId);
    }
  }, [selectedSiteId]);

  const toggleSitesList = () => {
    setShowSitesList((prev) => !prev);
  };

  const addSite = (site: Omit<Site, 'id'>) => {
    const newSite: Site = {
      ...site,
      id: Date.now().toString(), // Simple ID generation
    };
    setSites((prevSites) => [...prevSites, newSite]);
  };

  const removeSite = (id: string) => {
    setSites((prevSites) => prevSites.filter((site) => site.id !== id));
  };

  const setSelectedSite = (id: string) => {
    setSelectedSiteId(id);
  };

  const value = {
    showSitesList,
    toggleSitesList,
    sites,
    addSite,
    removeSite,
    selectedSiteId,
    setSelectedSite,
  };

  return (
    <MenuPreferencesContext.Provider value={value}>
      {children}
    </MenuPreferencesContext.Provider>
  );
};

export const useMenuPreferences = (): MenuPreferencesContextType => {
  const context = useContext(MenuPreferencesContext);
  if (context === undefined) {
    throw new Error('useMenuPreferences must be used within a MenuPreferencesProvider');
  }
  return context;
}; 