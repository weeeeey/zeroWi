'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUser } from '@/hooks/use-user';
import { TrendingUp } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { month: '월', desktop: 306, mobile: 20 },
  { month: '화', desktop: 305, mobile: 200 },
  { month: '수', desktop: 237, mobile: 120 },
  { month: '목', desktop: 73, mobile: 190 },
  { month: '금', desktop: 209, mobile: 130 },
  { month: '토', desktop: 214, mobile: 140 },
  { month: '일', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: '지난 주',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: '이번 주',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

type SelectContent = '중량' | '세트';
const SELECT_CONTENT: SelectContent[] = ['중량', '세트'];

export default function DiffChart() {
  const { userId } = useUser();
  const [selectedContent, setSelctedContent] = useState<SelectContent>('중량');
  const handleSelect = (value: SelectContent) => {
    setSelctedContent(value);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{selectedContent} 비교 데이터</CardTitle>
          <Select onValueChange={handleSelect} value={selectedContent}>
            <SelectTrigger className="select-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="top-full left-0">
              {SELECT_CONTENT.map((content, idx) => (
                <SelectItem key={idx} value={content}>
                  {content}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          지난 주에 비해 100kg 이상 증가 <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
