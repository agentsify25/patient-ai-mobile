
import React from 'react';
import { Card } from '@/components/ui/card';
import { Settings, Bell, Heart, Shield, HelpCircle } from 'lucide-react';

const menuItems = [
  { icon: Settings, label: 'Account Settings', description: 'Manage your account preferences' },
  { icon: Bell, label: 'Notifications', description: 'Alert preferences and reminders' },
  { icon: Heart, label: 'Health Preferences', description: 'Vital sign thresholds and goals' },
  { icon: Shield, label: 'Privacy & Security', description: 'Data sharing and security settings' },
  { icon: HelpCircle, label: 'Help & Support', description: 'Get help and contact support' },
];

export const ProfileSettingsMenu = () => {
  return (
    <div className="space-y-2">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="p-4 hover:bg-card/80 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="text-primary" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.label}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

