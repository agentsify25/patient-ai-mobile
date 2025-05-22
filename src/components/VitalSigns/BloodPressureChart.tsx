
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Line as RechartsLine } from 'recharts';
import { Activity } from 'lucide-react';
import { format } from 'date-fns';

interface DataPoint {
  time: string; // ISO string
  systolic?: number;
  diastolic?: number;
}

interface BloodPressureChartProps {
  data: DataPoint[];
  chartConfig: ChartConfig;
}

const BloodPressureChart: React.FC<BloodPressureChartProps> = ({ data, chartConfig }) => {
  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle>Blood Pressure</CardTitle>
        </div>
        <span className="text-sm text-muted-foreground">(mmHg)</span>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tickFormatter={(value) => format(new Date(value), 'HH:mm')} 
              angle={-30} 
              textAnchor="end" 
              height={50} 
            />
            <YAxis domain={['auto', 'auto']} />
            <ChartTooltip 
              content={<ChartTooltipContent labelFormatter={(value) => format(new Date(value), 'MMM d, HH:mm')} />} 
            />
            <RechartsLine type="monotone" dataKey="systolic" name="Systolic" strokeWidth={2} stroke="var(--color-blood_pressure_systolic)" dot={false} />
            <RechartsLine type="monotone" dataKey="diastolic" name="Diastolic" strokeWidth={2} stroke="var(--color-blood_pressure_diastolic)" dot={false} />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BloodPressureChart;
