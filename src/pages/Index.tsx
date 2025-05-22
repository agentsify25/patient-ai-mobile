import React, { useState, useEffect } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { HealthInsightCard } from '@/components/Health/HealthInsightCard';
import { QuickActionCard } from '@/components/Health/QuickActionCard';
import { MeasurementCard } from '@/components/Health/MeasurementCard';
import { Plus, BarChart3, Heart, Activity, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { VitalSignsFormData } from '@/lib/schemas'; // For type reference

interface ProfileData {
  first_name?: string;
}

interface VitalReadingFromDB extends VitalSignsFormData {
  id: string;
  profile_id: string;
  timestamp: string;
  created_at: string;
}

const fetchUserProfile = async (userId: string | undefined): Promise<ProfileData | null> => {
  if (!userId) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('first_name')
    .eq('id', userId)
    .single();
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user profile:', error);
    throw new Error(error.message);
  }
  return data;
};

const fetchLatestVitals = async (userId: string | undefined): Promise<VitalReadingFromDB | null> => {
  if (!userId) return null;
  const { data, error } = await supabase
    .from('vital_readings')
    .select('*')
    .eq('profile_id', userId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching latest vitals:', error);
    throw new Error(error.message);
  }
  return data as VitalReadingFromDB | null;
};

const getBloodPressureStatus = (systolic?: number, diastolic?: number): 'normal' | 'elevated' | 'high' | 'low' | 'critical' => {
  if (systolic === undefined || diastolic === undefined) return 'normal'; // Default or handle as no data
  if (systolic > 140 || diastolic > 90) return 'high'; // Simplified
  if (systolic > 120 || diastolic > 80) return 'elevated';
  if (systolic < 90 || diastolic < 60) return 'low';
  return 'normal';
};

const getHeartRateStatus = (hr?: number): 'normal' | 'low' | 'high' => {
  if (hr === undefined) return 'normal'; // Default or handle as no data
  if (hr > 100) return 'high';
  if (hr < 60) return 'low';
  return 'normal';
};

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: userProfile, isLoading: isLoadingProfile } = useQuery<ProfileData | null, Error>({
    queryKey: ['userProfile', user?.id],
    queryFn: () => fetchUserProfile(user?.id),
    enabled: !!user?.id,
  });

  const { data: latestVitals, isLoading: isLoadingVitals, error: vitalsError } = useQuery<VitalReadingFromDB | null, Error>({
    queryKey: ['latestVitalsHome', user?.id],
    queryFn: () => fetchLatestVitals(user?.id),
    enabled: !!user?.id,
  });

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good morning' : currentTime < 18 ? 'Good afternoon' : 'Good evening';
  const userName = userProfile?.first_name || "User";

  const recentMeasurements = [];
  if (latestVitals) {
    const timestamp = formatDistanceToNow(new Date(latestVitals.timestamp), { addSuffix: true });
    if (latestVitals.blood_pressure_systolic !== undefined && latestVitals.blood_pressure_diastolic !== undefined) {
      recentMeasurements.push({
        title: "Blood Pressure",
        value: `${latestVitals.blood_pressure_systolic}/${latestVitals.blood_pressure_diastolic}`,
        unit: "mmHg",
        status: getBloodPressureStatus(latestVitals.blood_pressure_systolic, latestVitals.blood_pressure_diastolic),
        icon: <Heart size={20} />,
        timestamp,
      });
    }
    if (latestVitals.heart_rate !== undefined) {
      recentMeasurements.push({
        title: "Heart Rate",
        value: String(latestVitals.heart_rate),
        unit: "BPM",
        status: getHeartRateStatus(latestVitals.heart_rate),
        icon: <Activity size={20} />,
        timestamp,
      });
    }
  }

  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Greeting Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-light text-muted-foreground mb-2">{greeting},</h1>
          <h2 className="text-3xl font-bold">
            {isLoadingProfile ? <Loader2 className="h-8 w-8 animate-spin inline-block" /> : userName}
          </h2>
        </div>

        {/* Health Insights Card */}
        <HealthInsightCard
          title="Health Insights"
          description="Unable to generate health insights at this time. Please try again later."
          isAvailable={false}
        />

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionCard
              title="New Reading"
              icon={Plus}
              gradient="gradient-health"
              onClick={() => navigate('/select-test')} {/* Updated navigation path here */}
            />
            <QuickActionCard
              title="View Trends"
              icon={BarChart3}
              gradient="gradient-success"
              onClick={() => navigate('/health')}
            />
          </div>
        </div>

        {/* Recent Measurements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Measurements</h3>
            <button
              className="text-primary text-sm hover:underline"
              onClick={() => navigate('/health')}
            >
              See All
            </button>
          </div>

          {isLoadingVitals && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {vitalsError && <p className="text-red-500 text-center">Error loading measurements: {vitalsError.message}</p>}
          {!isLoadingVitals && !vitalsError && recentMeasurements.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No recent measurements found. Log your vitals!</p>
          )}
          {!isLoadingVitals && !vitalsError && recentMeasurements.length > 0 && (
            <div className="space-y-3">
              {recentMeasurements.map((measurement, index) => (
                <MeasurementCard
                  key={index}
                  title={measurement.title}
                  value={measurement.value}
                  unit={measurement.unit}
                  status={measurement.status as 'normal' | 'low' | 'high' | 'elevated' | 'critical'} // Cast status
                  icon={measurement.icon}
                  timestamp={measurement.timestamp}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
