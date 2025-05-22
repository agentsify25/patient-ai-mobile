import React, { useEffect, useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Calendar,
  Loader2,
  Save
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/schemas';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar components

interface ProfileData extends ProfileFormData {
  email?: string;
  patientId?: string; // Assuming patientId might come from profile or user metadata
}

const Profile = () => {
  const { user, signOut, session } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('first_name, last_name, national_id, avatar_url')
            .eq('id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116: 'single' row not found
            throw error;
          }
          
          if (data) {
            const fetchedProfileData = {
              firstName: data.first_name || '',
              lastName: data.last_name || '',
              nationalId: data.national_id || '',
              avatarUrl: data.avatar_url || '',
              email: user.email,
              // You might want to derive patientId or have a placeholder
              patientId: `PAT-${user.id.substring(0,8).toUpperCase()}`
            };
            setProfile(fetchedProfileData);
            profileForm.reset({
              firstName: data.first_name || '',
              lastName: data.last_name || '',
              nationalId: data.national_id || '',
              avatarUrl: data.avatar_url || '',
            });
          } else {
             // Handle case where profile might not exist yet if handle_new_user trigger failed or is slow
            const initialProfileData = {
              firstName: user.user_metadata?.first_name || '',
              lastName: user.user_metadata?.last_name || '',
              nationalId: '',
              avatarUrl: user.user_metadata?.avatar_url || '',
              email: user.email,
              patientId: `PAT-${user.id.substring(0,8).toUpperCase()}`
            };
            setProfile(initialProfileData);
            profileForm.reset(initialProfileData);
          }
        } catch (error: any) {
          console.error('Error fetching profile:', error);
          toast({ title: 'Error Fetching Profile', description: error.message, variant: 'destructive' });
          // Set a default profile structure on error to prevent UI breakage
          const defaultProfile = {
              firstName: user.user_metadata?.first_name || 'N/A',
              lastName: user.user_metadata?.last_name || 'N/A',
              nationalId: 'N/A',
              avatarUrl: user.user_metadata?.avatar_url || '',
              email: user.email,
              patientId: `PAT-${user.id.substring(0,8).toUpperCase()}`
          };
          setProfile(defaultProfile);
          profileForm.reset(defaultProfile);

        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (session) { // Only fetch if session is active
        fetchProfile();
    }
  }, [user, session, profileForm]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          national_id: data.nationalId || null,
          avatar_url: data.avatarUrl || null,
        })
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, ...data } : data as ProfileData); // Update local state
      toast({ title: 'Profile Updated', description: 'Your profile has been successfully updated.' });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({ title: 'Update Failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const menuItems = [
    { icon: Settings, label: 'Account Settings', description: 'Manage your account preferences' },
    { icon: Bell, label: 'Notifications', description: 'Alert preferences and reminders' },
    { icon: Heart, label: 'Health Preferences', description: 'Vital sign thresholds and goals' },
    { icon: Shield, label: 'Privacy & Security', description: 'Data sharing and security settings' },
    { icon: HelpCircle, label: 'Help & Support', description: 'Get help and contact support' },
  ];

  if (isLoading) {
    return (
      <MobileLayout title="Profile">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </MobileLayout>
    );
  }
  
  if (!profile && !isLoading) {
     return (
      <MobileLayout title="Profile">
        <div className="text-center py-10">
          <p>Could not load profile data. Please try again later.</p>
          <Button onClick={signOut} variant="outline" className="mt-4">Sign Out</Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Profile">
      <form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile?.avatarUrl || undefined} alt={profile?.firstName} />
                <AvatarFallback className="bg-primary/20 text-primary text-3xl">
                  {profile?.firstName?.[0]?.toUpperCase()}
                  {profile?.lastName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Camera button for avatar upload - implement later */}
              {/* <Button size="sm" className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"><Camera size={16} /></Button> */}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold">{profile?.firstName} {profile?.lastName}</h2>
              <p className="text-muted-foreground">Patient ID: {profile?.patientId || 'N/A'}</p>
              <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                Verified Patient
              </Badge>
            </div>
          </div>
        </Card>

        {/* Personal Information Form */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...profileForm.register('firstName')} />
              {profileForm.formState.errors.firstName && <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...profileForm.register('lastName')} />
              {profileForm.formState.errors.lastName && <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.lastName.message}</p>}
            </div>
            <div>
              <Label htmlFor="nationalId">National ID (Optional)</Label>
              <Input id="nationalId" {...profileForm.register('nationalId')} />
              {profileForm.formState.errors.nationalId && <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.nationalId.message}</p>}
            </div>
             <div>
              <Label htmlFor="avatarUrl">Avatar URL (Optional)</Label>
              <Input id="avatarUrl" type="url" {...profileForm.register('avatarUrl')} placeholder="https://example.com/avatar.png"/>
              {profileForm.formState.errors.avatarUrl && <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.avatarUrl.message}</p>}
            </div>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2" size={16} />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information (Read-only for now based on initial profile details) */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="text-muted-foreground" size={16} />
              <span className="text-sm">{profile?.email || 'N/A'}</span>
            </div>
            {/* Other static fields from original design, can be made dynamic later */}
            <div className="flex items-center gap-3">
              <Phone className="text-muted-foreground" size={16} />
              <span className="text-sm">+1 (555) 123-4567 (Placeholder)</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-muted-foreground" size={16} />
              <span className="text-sm">Born: March 15, 1985 (Placeholder)</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-muted-foreground" size={16} />
              <span className="text-sm">New York, NY (Placeholder)</span>
            </div>
          </div>
        </Card>

        {/* Health Summary (Static as per original design) */}
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

        {/* Settings Menu (Static as per original design) */}
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

        {/* Emergency Information (Static as per original design) */}
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
        <Button onClick={signOut} variant="outline" className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10">
          <LogOut className="mr-2" size={16} />
          Sign Out
        </Button>
      </form>
    </MobileLayout>
  );
};

export default Profile;
