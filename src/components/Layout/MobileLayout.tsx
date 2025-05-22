
import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { TopNavigation } from './TopNavigation';
import { HamburgerMenuButton } from './HamburgerMenuButton'; // Import the new component

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
}

export const MobileLayout = ({ children, title }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center h-14 px-4"> {/* Removed justify-between, rely on flex-grow */}
          <HamburgerMenuButton /> {/* Add hamburger menu button */}
          {title ? (
            <h1 className="text-lg font-semibold truncate text-center flex-grow mx-2">{title}</h1>
          ) : (
            <div className="flex-grow" /> /* Placeholder to push TopNavigation right if no title */
          )}
          <TopNavigation /> {/* This contains Profile and Settings icons */}
        </div>
      </div>
      <main className="px-4 py-6">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
