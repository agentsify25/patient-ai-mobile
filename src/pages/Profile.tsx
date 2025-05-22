
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Bell, 
  Heart, 
  Shield, 
  HelpCircle, 
  LogOut,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

const Profile = () => {
  const menuItems = [
    { icon: Settings, label: 'Account Settings', description: 'Manage your account preferences' },
    { icon: Bell, label: 'Notifications', description: 'Alert preferences and reminders' },
    { icon: Heart, label: 'Health Preferences', description: 'Vital sign thresholds and goals' },
    { icon: Shield, label: 'Privacy & Security', description: 'Data sharing and security settings' },
    { icon: HelpCircle, label: 'Help & Support', description: 'Get help and contact support' },
  ];

  return (
    <MobileLayout title="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="text-primary" size={40} />
              </div>
              <Button 
                size="sm" 
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"
              >
                <Camera size={16} />
              </Button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold">Alex Johnson</h2>
              <p className="text-muted-foreground">Patient ID: #PAT-2024-001</p>
              <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                Verified Patient
              </Badge>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="text-muted-foreground" size={16} />
              <span className="text-sm">alex.johnson@email.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-muted-foreground" size={16} />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-muted-foreground" size={16} />
              <span className="text-sm">Born: March 15, 1985</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-muted-foreground" size={16} />
              <span className="text-sm">New York, NY</span>
            </div>
          </div>
        </Card>

        {/* Health Summary */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Health Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">95</div>
              <div className="text-sm text-muted-foreground">Health Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">12</div>
              <div className="text-sm text-muted-foreground">Days Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">8</div>
              <div className="text-sm text-muted-foreground">Medications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">3</div>
              <div className="text-sm text-muted-foreground">Care Team</div>
            </div>
          </div>
        </Card>

        {/* Settings Menu */}
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

        {/* Emergency Information */}
        <Card className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
          <h3 className="font-semibold text-red-400 mb-2">Emergency Information</h3>
          <p className="text-sm text-muted-foreground mb-3">
            In case of emergency, this information will be shared with first responders.
          </p>
          <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
            Update Emergency Info
          </Button>
        </Card>

        {/* Sign Out */}
        <Button variant="outline" className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10">
          <LogOut className="mr-2" size={16} />
          Sign Out
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Profile;
