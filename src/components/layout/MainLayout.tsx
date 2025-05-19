import React from 'react';
import { BottomNav } from './BottomNav';
import { useLocation } from 'react-router-dom';
import { useUIPreferences } from '../../context/UIPreferences';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const path = location.pathname;
  const { hideBottomNav: hideBottomNavFromContext } = useUIPreferences();
  
  // Hide bottom navigation on message detail pages and post detail pages
  // or when explicitly set from the context (e.g., when comment modal is open)
  const hideBottomNav = path.match(/\/messages\/[^/]+/) || 
                       path.match(/\/community\/post\/[^/]+/) || 
                       hideBottomNavFromContext;
  
  return (
    <div className={`min-h-screen bg-background flex flex-col w-full ${!hideBottomNav ? 'pb-16' : ''}`}>
      {children}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};
