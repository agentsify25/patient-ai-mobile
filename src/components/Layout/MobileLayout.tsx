
import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
}

export const MobileLayout = ({ children, title }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {title && (
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-center h-14 px-4">
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
        </div>
      )}
      <main className="px-4 py-6">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
