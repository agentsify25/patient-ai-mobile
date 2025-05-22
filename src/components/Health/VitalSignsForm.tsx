import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { vitalSignsSchema, VitalSignsFormData } from '@/lib/schemas';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Smartphone } from 'lucide-react';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';

export const VitalSignsForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectingDevice, setIsConnectingDevice] = useState(false);

  const form = useForm<VitalSignsFormData>({
    resolver: zodResolver(vitalSignsSchema),
    defaultValues: {
      blood_pressure_systolic: undefined,
      blood_pressure_diastolic: undefined,
      heart_rate: undefined,
      spo2: undefined,
      temperature_celsius: undefined,
      respiratory_rate: undefined,
      notes: '',
    },
  });

  const onSubmit = async (data: VitalSignsFormData) => {
    if (!user) {
      toast.error('You must be logged in to log vitals.');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.from('vital_readings').insert({
        profile_id: user.id,
        blood_pressure_systolic: data.blood_pressure_systolic,
        blood_pressure_diastolic: data.blood_pressure_diastolic,
        heart_rate: data.heart_rate,
        spo2: data.spo2,
        temperature_celsius: data.temperature_celsius,
        respiratory_rate: data.respiratory_rate,
        notes: data.notes,
      });

      if (error) {
        throw error;
      }
      toast.success('Vital signs logged successfully!');
      form.reset();
    } catch (error: any) {
      toast.error('Failed to log vital signs.', { description: error.message });
      console.error('Error logging vital signs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectDevice = async () => {
    setIsConnectingDevice(true);
    // Toast for starting connection is handled in connectToLinktop
    const vitalsData = await connectToLinktop();
    setIsConnectingDevice(false);

    if (vitalsData) {
      // toast.success("Vitals read from device!"); // Already toasted in service or upon specific reads
      if (vitalsData.heartRate !== undefined) {
        form.setValue('heart_rate', vitalsData.heartRate, { shouldValidate: true });
      }
      if (vitalsData.spo2 !== undefined) {
        form.setValue('spo2', vitalsData.spo2, { shouldValidate: true });
      }
      if (vitalsData.temperature !== undefined) {
        // Ensure temperature is a number and handle potential NaN or undefined from toFixed
        const tempValue = parseFloat(vitalsData.temperature.toFixed(1));
        if (!isNaN(tempValue)) {
            form.setValue('temperature_celsius', tempValue, { shouldValidate: true });
        }
      }
      // Blood pressure is not included in the Linktop example data from the user.
      // If it were, it would be set here.

      if (vitalsData.batteryLevel !== undefined) {
          toast.info(`Linktop Device Battery: ${vitalsData.batteryLevel}%`);
      }
    } else {
      // Specific error toasts are generally handled within connectToLinktop.
      // A generic fallback toast here might be redundant unless connectToLinktop guarantees no toasts on failure.
      // For now, assuming connectToLinktop handles its own error feedback.
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Log Your Vital Signs</CardTitle>
        <CardDescription>Enter your latest readings below, or connect a device.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button 
            type="button" 
            onClick={handleConnectDevice} 
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
            disabled={isConnectingDevice || isLoading}
          >
            {isConnectingDevice ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Smartphone size={20} className="mr-2 h-4 w-4" />
            )}
            {isConnectingDevice ? 'Connecting Device...' : 'Connect Linktop & Read Vitals'}
          </Button>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="blood_pressure_systolic">Systolic BP (mmHg)</Label>
              <Input id="blood_pressure_systolic" type="number" {...form.register('blood_pressure_systolic')} />
              {form.formState.errors.blood_pressure_systolic && <p className="text-red-500 text-sm mt-1">{form.formState.errors.blood_pressure_systolic.message}</p>}
            </div>
            <div>
              <Label htmlFor="blood_pressure_diastolic">Diastolic BP (mmHg)</Label>
              <Input id="blood_pressure_diastolic" type="number" {...form.register('blood_pressure_diastolic')} />
              {form.formState.errors.blood_pressure_diastolic && <p className="text-red-500 text-sm mt-1">{form.formState.errors.blood_pressure_diastolic.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="heart_rate">Heart Rate (bpm)</Label>
              <Input id="heart_rate" type="number" {...form.register('heart_rate')} />
              {form.formState.errors.heart_rate && <p className="text-red-500 text-sm mt-1">{form.formState.errors.heart_rate.message}</p>}
            </div>
            <div>
              <Label htmlFor="spo2">SpO2 (%)</Label>
              <Input id="spo2" type="number" {...form.register('spo2')} />
              {form.formState.errors.spo2 && <p className="text-red-500 text-sm mt-1">{form.formState.errors.spo2.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temperature_celsius">Temperature (°C)</Label>
              <Input id="temperature_celsius" type="number" step="0.1" {...form.register('temperature_celsius')} />
              {form.formState.errors.temperature_celsius && <p className="text-red-500 text-sm mt-1">{form.formState.errors.temperature_celsius.message}</p>}
            </div>
            <div>
              <Label htmlFor="respiratory_rate">Respiratory Rate (breaths/min)</Label>
              <Input id="respiratory_rate" type="number" {...form.register('respiratory_rate')} />
              {form.formState.errors.respiratory_rate && <p className="text-red-500 text-sm mt-1">{form.formState.errors.respiratory_rate.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea id="notes" {...form.register('notes')} placeholder="Any additional notes..." />
            {form.formState.errors.notes && <p className="text-red-500 text-sm mt-1">{form.formState.errors.notes.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || isConnectingDevice}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log Vitals
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
