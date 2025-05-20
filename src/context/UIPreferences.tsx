import React, { createContext, useContext, useState } from 'react';

type UIPreferencesContextType = {
  showNavigation: boolean;
  toggleNavigation: () => void;
  hideBottomNav: boolean;
  setHideBottomNav: (hide: boolean) => void;
  useMentionContextMenu: boolean;
  setUseMentionContextMenu: (use: boolean) => void;
};

// Create a default context value
const UIPreferencesContext = createContext<UIPreferencesContextType>({
  showNavigation: false,
  toggleNavigation: () => {
    console.warn('UIPreferencesContext not initialized yet');
  },
  hideBottomNav: false,
  setHideBottomNav: () => {
    console.warn('UIPreferencesContext not initialized yet');
  },
  useMentionContextMenu: false,
  setUseMentionContextMenu: () => {
    console.warn('UIPreferencesContext not initialized yet');
  }
});

export const UIPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use state to track navigation visibility
  const [showNav, setShowNav] = useState(false);
  // State to control bottom navigation visibility
  const [hideBottomNav, setHideBottomNav] = useState(false);
  // State to control which version of the mention menu to use
  const [useMentionContextMenu, setUseMentionContextMenu] = useState(true);

  // Define toggle function
  const toggle = () => {
    setShowNav(prev => {
      console.log("Toggling navigation from", prev, "to", !prev);
      return !prev;
    });
  };

  // Create value object with current state and toggle function
  const contextValue = {
    showNavigation: showNav,
    toggleNavigation: toggle,
    hideBottomNav,
    setHideBottomNav,
    useMentionContextMenu,
    setUseMentionContextMenu,
  };

  // Provide context to children
  return (
    <UIPreferencesContext.Provider value={contextValue}>
      {children}
    </UIPreferencesContext.Provider>
  );
};

export const useUIPreferences = () => {
  return useContext(UIPreferencesContext);
}; 