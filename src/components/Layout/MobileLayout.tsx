
import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';

interface MobileLayoutProps {
  children: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}

export const MobileLayout = ({ children, headerLeft, headerRight }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center h-14 px-4">
          {headerLeft ? headerLeft : null}
          <div className="flex-grow" /> {/* Ensures headerLeft and headerRight are spaced correctly */}
          <div className="w-auto min-w-[40px] flex justify-end">
            {headerRight ? headerRight : null}
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
