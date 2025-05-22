
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Line as RechartsLine } from 'recharts';
import { Droplets } from 'lucide-react';
import { format } from 'date-fns';

interface DataPoint {
  time: string; // ISO string
  spo2?: number;
}

interface Spo2ChartProps {
  data: DataPoint[];
  chartConfig: ChartConfig;
}

const Spo2Chart: React.FC<Spo2ChartProps> = ({ data, chartConfig }) => {
  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          <CardTitle>Blood Oxygen</CardTitle>
        </div>
        <span className="text-sm text-muted-foreground">(%)</span>
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
            <YAxis domain={[80, 100]} allowDataOverflow={true} />
            <ChartTooltip 
              content={<ChartTooltipContent labelFormatter={(value) => format(new Date(value), 'MMM d, HH:mm')} />} 
            />
            <RechartsLine type="monotone" dataKey="spo2" name="SpO2" strokeWidth={2} stroke="var(--color-spo2)" dot={false} />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Spo2Chart;
