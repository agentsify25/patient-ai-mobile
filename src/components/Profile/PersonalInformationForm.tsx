
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ProfileFormData } from '@/lib/schemas';

interface PersonalInformationFormProps {
  profileForm: UseFormReturn<ProfileFormData>;
  isUpdating: boolean;
}

export const PersonalInformationForm = ({ profileForm, isUpdating }: PersonalInformationFormProps) => {
  const { register, formState: { errors } } = profileForm;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register('firstName')} />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register('lastName')} />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <Label htmlFor="nationalId">National ID (Optional)</Label>
          <Input id="nationalId" {...register('nationalId')} />
          {errors.nationalId && <p className="text-red-500 text-sm mt-1">{errors.nationalId.message}</p>}
        </div>
          <div>
          <Label htmlFor="avatarUrl">Avatar URL (Optional)</Label>
          <Input id="avatarUrl" type="url" {...register('avatarUrl')} placeholder="https://example.com/avatar.png"/>
          {errors.avatarUrl && <p className="text-red-500 text-sm mt-1">{errors.avatarUrl.message}</p>}
        </div>
        <Button type="submit" disabled={isUpdating}>
          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2" size={16} />
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

