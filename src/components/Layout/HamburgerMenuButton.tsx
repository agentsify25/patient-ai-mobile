
import React from 'react';
import { Menu, User, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

export const HamburgerMenuButton = () => {
  const navigate = useNavigate();

  const handleAppSettingsClick = () => {
    console.log('App Settings clicked from menu');
    // Potentially navigate('/app-settings') or open a modal
    alert('App Settings clicked! This feature is not yet implemented.');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Common style for menu items
  const menuItemStyle = "flex items-center w-full p-3 text-left hover:bg-accent rounded-md text-sm";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          {/* Removed the explicit SheetClose button from here */}
        </SheetHeader>
        <div className="p-4 space-y-2">
          <SheetClose asChild>
            <button onClick={handleProfileClick} className={menuItemStyle}>
              <User className="mr-3 h-5 w-5 text-primary" />
              <span>Profile</span>
            </button>
          </SheetClose>
          <SheetClose asChild>
            <button onClick={handleAppSettingsClick} className={menuItemStyle}>
              <Settings className="mr-3 h-5 w-5 text-primary" />
              <span>App Settings</span>
            </button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

