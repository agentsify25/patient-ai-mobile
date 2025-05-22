
import { Heart, Activity, Thermometer, Droplets, Zap, Gauge } from 'lucide-react';
import React from 'react';

export interface VitalData {
  title: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  gradient: string;
}

export const vitalsData: VitalData[] = [
  {
    title: 'Blood Pressure',
    value: '121/77',
    unit: 'mmHg',
    status: 'warning' as const,
    trend: 'up' as const,
    icon: <Heart size={20} />,
    gradient: 'gradient-warning'
  },
  {
    title: 'Heart Rate',
    value: '72',
    unit: 'BPM',
    status: 'normal' as const,
    trend: 'stable' as const,
    icon: <Activity size={20} />,
    gradient: 'gradient-success'
  },
  {
    title: 'SpO2',
    value: '98',
    unit: '%',
    status: 'normal' as const,
    trend: 'stable' as const,
    icon: <Droplets size={20} />,
    gradient: 'gradient-health'
  },
  {
    title: 'Temperature',
    value: '98.6',
    unit: '°F',
    status: 'normal' as const,
    trend: 'stable' as const,
    icon: <Thermometer size={20} />,
    gradient: 'gradient-success'
  },
  {
    title: 'Glucose',
    value: '95',
    unit: 'mg/dL',
    status: 'normal' as const,
    trend: 'down' as const,
    icon: <Zap size={20} />,
    gradient: 'gradient-health'
  },
  {
    title: 'Weight',
    value: '72.5',
    unit: 'kg',
    status: 'normal' as const,
    trend: 'down' as const,
    icon: <Gauge size={20} />,
    gradient: 'gradient-success'
  }
];
