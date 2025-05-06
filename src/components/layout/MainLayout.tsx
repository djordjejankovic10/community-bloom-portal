import React from 'react';
import { BottomNav } from './BottomNav';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Hide bottom navigation on message detail pages
  const hideBottomNav = path.match(/\/messages\/[^/]+/);
  
  return (
    <div className={`min-h-screen bg-background flex flex-col ${!hideBottomNav ? 'pb-16' : ''}`}>
      {children}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};
