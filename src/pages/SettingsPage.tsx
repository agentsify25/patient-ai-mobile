import React from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, User, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { headerLeft, headerRight } = DefaultPageHeaderElements();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleAppSettingsClick = () => {
    toast.info('App Settings clicked! This feature can be expanded here.');
    console.log('App Settings clicked from Settings page');
  };
  
  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      description: 'View and edit your personal information',
      onClick: handleProfileClick,
    },
    {
      icon: SettingsIcon,
      label: 'App Settings',
      description: 'Manage application preferences',
      onClick: handleAppSettingsClick,
    },
  ];

  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Settings</h1>
      <div className="space-y-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card 
              key={index} 
              className="p-0 overflow-hidden hover:bg-muted/50 transition-colors"
              onClick={item.onClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && item.onClick()}
            >
              <div className="flex items-center p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                  <Icon className="text-primary" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.label}</h4>
                  {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                </div>
                <ChevronRight className="text-muted-foreground" size={20} />
              </div>
            </Card>
          );
        })}
      </div>
    </MobileLayout>
  );
};

export default SettingsPage;
