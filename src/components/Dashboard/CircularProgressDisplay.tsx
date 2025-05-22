
import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface CircularProgressDisplayProps {
  value: number | null | undefined;
  maxValue?: number;
  unit: string;
  label: string;
  color: string; // Hex color for the bar
  valueFontSize?: string;
  labelFontSize?: string;
  unitFontSize?: string;
  size?: number;
  isLoading?: boolean;
  showLabel?: boolean; // Added this prop
}

export const CircularProgressDisplay: React.FC<CircularProgressDisplayProps> = ({
  value,
  maxValue = 100,
  unit,
  label,
  color,
  valueFontSize = 'text-5xl',
  labelFontSize = 'text-sm',
  unitFontSize = 'text-lg',
  size = 200,
  isLoading = false,
  showLabel = true, // Default to true if not provided
}) => {
  const validValue = (value !== null && value !== undefined && !isNaN(value)) ? value : 0;
  const displayValue = (value !== null && value !== undefined && !isNaN(value)) ? value : null;
  
  const percentage = maxValue > 0 ? (validValue / maxValue) * 100 : 0;
  const data = [{ name: label, value: validValue, fill: color, percentageValue: percentage }];

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div style={{ width: size, height: size }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            barSize={12}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, maxValue]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: 'rgba(255, 255, 255, 0.1)' }}
              dataKey="percentageValue"
              angleAxisId={0}
              cornerRadius={10}
              className="transition-all"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Custom label in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${valueFontSize} font-bold text-foreground`}>
            {isLoading ? '--' : displayValue !== null ? displayValue.toFixed(displayValue % 1 !== 0 ? 1 : 0) : '--'}
          </span>
          <span className={`${unitFontSize} text-muted-foreground`}>{isLoading ? '' : unit}</span>
        </div>
      </div>
      {showLabel && <p className={`${labelFontSize} text-muted-foreground mt-3 font-medium`}>{label}</p>}
    </div>
  );
};

