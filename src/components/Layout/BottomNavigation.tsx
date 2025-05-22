
import { Home, Activity, Calendar, MessageCircle, User, ClipboardPlus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Activity, label: 'Health', path: '/health' },
  { icon: ClipboardPlus, label: 'Log Vitals', path: '/log-vitals' },
  { icon: Calendar, label: 'Appointments', path: '/appointments' },
  { icon: MessageCircle, label: 'Messages', path: '/messages' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-2 py-2 h-auto flex-1 transition-colors whitespace-normal ${ // Added whitespace-normal
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{ minWidth: '0' }} // Ensure button can shrink
            >
              <Icon size={20} />
              <span className="text-xs font-medium text-center break-words w-full">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

