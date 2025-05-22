
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HamburgerMenuButton = () => {
  const handleMenuClick = () => {
    // For now, let's just log to the console.
    // This could open a drawer or sidebar in the future.
    console.log('Hamburger menu clicked');
    alert('Hamburger menu clicked! Drawer functionality not yet implemented.');
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleMenuClick} aria-label="Open menu">
      <Menu size={24} /> {/* Increased size slightly for better visibility */}
    </Button>
  );
};
