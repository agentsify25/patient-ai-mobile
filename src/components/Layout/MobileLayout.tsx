
import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
// import { TopNavigation } from './TopNavigation'; // Will be replaced by headerRight
import { HamburgerMenuButton } from './HamburgerMenuButton';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}

export const MobileLayout = ({ children, title, headerLeft, headerRight }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center h-14 px-4">
          {headerLeft ? headerLeft : <HamburgerMenuButton />}
          {title ? (
            <h1 className="text-lg font-semibold truncate text-center flex-grow mx-2 mt-1">{title}</h1> {/* Added mt-1 */}
          ) : (
            <div className="flex-grow" /> 
          )}
          <div className="w-auto min-w-[40px] flex justify-end"> {/* Adjusted width to auto for flexibility */}
            {headerRight ? headerRight : null /* Was <TopNavigation /> */}
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

