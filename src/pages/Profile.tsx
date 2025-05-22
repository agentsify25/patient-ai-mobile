
import React, { useEffect, useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/schemas';
import { toast } from '@/components/ui/use-toast'; // Corrected import path if needed

// Import new Profile components
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { PersonalInformationForm } from '@/components/Profile/PersonalInformationForm';
import { ContactInformation } from '@/components/Profile/ContactInformation';
import { HealthSummary } from '@/components/Profile/HealthSummary';
import { ProfileSettingsMenu } from '@/components/Profile/ProfileSettingsMenu';
import { EmergencyInformation } from '@/components/Profile/EmergencyInformation';

interface ProfileData extends ProfileFormData {
  email?: string;
  patientId?: string;
}

const Profile = () => {
  const { user, signOut, session } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { // It's good practice to set defaultValues
      firstName: '',
      lastName: '',
      nationalId: '',
      avatarUrl: '',
    }
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

          if (error && error.code !== 'PGRST116') {
            throw error;
          }
          
          if (data) {
            const fetchedProfileData: ProfileData = {
              firstName: data.first_name || '',
              lastName: data.last_name || '',
              nationalId: data.national_id || '',
              avatarUrl: data.avatar_url || '',
              email: user.email,
              patientId: `PAT-${user.id.substring(0,8).toUpperCase()}`
            };
            setProfile(fetchedProfileData);
            profileForm.reset({ // reset form with fetched data
              firstName: fetchedProfileData.firstName,
              lastName: fetchedProfileData.lastName,
              nationalId: fetchedProfileData.nationalId,
              avatarUrl: fetchedProfileData.avatarUrl,
            });
          } else {
            const initialProfileData: ProfileData = {
              firstName: user.user_metadata?.first_name || '',
              lastName: user.user_metadata?.last_name || '',
              nationalId: '',
              avatarUrl: user.user_metadata?.avatar_url || '',
              email: user.email,
              patientId: `PAT-${user.id.substring(0,8).toUpperCase()}`
            };
            setProfile(initialProfileData);
            profileForm.reset({ // reset form with initial data
              firstName: initialProfileData.firstName,
              lastName: initialProfileData.lastName,
              nationalId: initialProfileData.nationalId,
              avatarUrl: initialProfileData.avatarUrl,
            });
          }
        } catch (error: any) {
          console.error('Error fetching profile:', error);
          toast({ title: 'Error Fetching Profile', description: error.message, variant: 'destructive' });
          const defaultProfile: ProfileData = {
              firstName: user.user_metadata?.first_name || 'N/A',
              lastName: user.user_metadata?.last_name || 'N/A',
              nationalId: 'N/A',
              avatarUrl: user.user_metadata?.avatar_url || '',
              email: user.email,
              patientId: `PAT-${user.id.substring(0,8).toUpperCase()}`
          };
          setProfile(defaultProfile);
          profileForm.reset({ // reset form with default data on error
            firstName: defaultProfile.firstName,
            lastName: defaultProfile.lastName,
            nationalId: defaultProfile.nationalId,
            avatarUrl: defaultProfile.avatarUrl,
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (session) {
        fetchProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [user, session]); // profileForm.reset was removed from deps to avoid re-fetch loops if reset causes re-renders

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
      
      setProfile(prev => prev ? { ...prev, ...data } : data as ProfileData);
      toast({ title: 'Profile Updated', description: 'Your profile has been successfully updated.' });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({ title: 'Update Failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsUpdating(false);
    }
  };
  
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
        <ProfileHeader 
          avatarUrl={profile?.avatarUrl}
          firstName={profile?.firstName}
          lastName={profile?.lastName}
          patientId={profile?.patientId}
        />

        <PersonalInformationForm 
          profileForm={profileForm}
          isUpdating={isUpdating}
        />

        <ContactInformation email={profile?.email} />

        <HealthSummary />

        <ProfileSettingsMenu />
        
        <EmergencyInformation />

        <Button onClick={signOut} variant="outline" className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10">
          <LogOut className="mr-2" size={16} />
          Sign Out
        </Button>
      </form>
    </MobileLayout>
  );
};

export default Profile;

