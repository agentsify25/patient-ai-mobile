
import React from 'react';
// import { Droplets } from 'lucide-react'; // Example icon if needed

interface BloodPressureDisplayProps {
  systolic: number | null | undefined;
  diastolic: number | null | undefined;
  unit: string;
  size?: number;
  color?: string;
  isLoading?: boolean;
}

export const BloodPressureDisplay: React.FC<BloodPressureDisplayProps> = ({
  systolic,
  diastolic,
  unit,
  size = 220, // Increased size slightly
  color = '#FFD700', // Yellowish color
  isLoading = false,
}) => {
  const displaySystolic = !isLoading && systolic !== null && systolic !== undefined && !isNaN(systolic) ? systolic : '--';
  const displayDiastolic = !isLoading && diastolic !== null && diastolic !== undefined && !isNaN(diastolic) ? diastolic : '--';

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div
        className="relative rounded-full flex flex-col items-center justify-center p-4" // Added padding
        style={{
          width: size,
          height: size,
          border: `12px solid ${color}`, // Gauge-like border
        }}
      >
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-foreground">{displaySystolic}</span>
          <span className="text-2xl font-bold text-foreground relative -top-1">/</span>
          <span className="text-4xl font-bold text-foreground">{displayDiastolic}</span>
        </div>
        <span className="text-md text-muted-foreground mt-1">{isLoading ? '' : unit}</span>
        <div className="text-xs text-muted-foreground mt-2 leading-tight">
          <div>Systolic</div>
          <div>Diastolic</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4 font-medium">Blood Pressure</p>
    </div>
  );
};
