
import React from 'react';
import { User, Settings } from 'lucide-react';
import { useNavigate }
from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const TopNavigation = () => {
  const navigate = useNavigate();

  const handleAppSettingsClick = () => {
    // For now, let's just log to the console.
    // This could navigate to a new page or open a settings modal in the future.
    console.log('App Settings clicked');
    alert('App Settings clicked! This feature is not yet implemented.');
  };

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" onClick={() => navigate('/profile')} aria-label="Profile">
        <User size={20} />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleAppSettingsClick} aria-label="App Settings">
        <Settings size={20} />
      </Button>
    </div>
  );
};
