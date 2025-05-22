import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { TopNavigation } from './TopNavigation';
import { HamburgerMenuButton } from './HamburgerMenuButton';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
}

export const MobileLayout = ({ children, title }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center h-14 px-4">
          <HamburgerMenuButton />
          {title ? (
            <h1 className="text-lg font-semibold truncate text-center flex-grow mx-2">{title}</h1>
          ) : (
            <div className="flex-grow" /> 
          )}
          <div className="w-10">
            <TopNavigation />
          </div>
        </div>
      </div>
      <main className="px-4 py-6">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
