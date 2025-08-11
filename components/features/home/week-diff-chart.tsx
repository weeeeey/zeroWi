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
import { weekLabel, weekLabelFromDate } from '@/lib/home/utils';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { memo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

// 첨부된 이미지와 같이 이번 주와 선택된 주가 한 막대에 표시되도록 데이터 구조를 변경합니다.
const chartData = [
  { day: '월', thisWeek: 306, selectedWeek: 280 },
  { day: '화', thisWeek: 305, selectedWeek: 200 },
  { day: '수', thisWeek: 237, selectedWeek: 320 },
  { day: '목', thisWeek: 173, selectedWeek: 190 },
  { day: '금', thisWeek: 209, selectedWeek: 230 },
  { day: '토', thisWeek: 214, selectedWeek: 140 },
  { day: '일', thisWeek: 180, selectedWeek: 160 },
];

const chartConfig = (selectedWeekLabel?: string): ChartConfig => {
  const config: ChartConfig = {
    selectedWeek: {
      label: selectedWeekLabel || '선택 주',
      color: 'hsl(var(--chart-1))', // 연한 회색 (배경처럼 보이도록)
    },
    thisWeek: {
      label: '이번 주',
      color: 'hsl(var(--chart-2))', // 진한 파란색 (앞에 보이도록)
    },
  };

  return config;
};

type SelectContent = '중량' | '세트';
const SELECT_CONTENT: SelectContent[] = ['중량', '세트'];

interface WeekDiffChartProps {
  selectedWeekDays: Date[];
  today: Date;
  profileId: string;
}

function WeekDiffChart({ selectedWeekDays, today, profileId }: WeekDiffChartProps) {
  const thisWeekLabel = weekLabelFromDate(today);
  const selectedWeekLabel = weekLabel(selectedWeekDays);
  const isSameWeek = selectedWeekDays.some((day) => {
    return day.getTime() === today.getTime();
  });

  const [selectedContent, setSelectedContent] = useState<SelectContent>('중량');
  const handleSelect = (value: SelectContent) => {
    setSelectedContent(value);
  };

  // 전주 대비 증감률 계산 (예시)
  const calculateWeeklyChange = () => {
    if (isSameWeek) return { value: 0, isIncrease: true };

    const thisWeekTotal = chartData.reduce((sum, item) => sum + item.thisWeek, 0);
    const selectedWeekTotal = chartData.reduce((sum, item) => sum + item.selectedWeek, 0);
    const change = thisWeekTotal - selectedWeekTotal;

    return {
      value: Math.abs(change),
      isIncrease: change > 0,
    };
  };

  const weeklyChange = calculateWeeklyChange();

  return (
    <Card className="rounded-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {selectedContent}
            <span className="text-sm text-slate-500">
              ({selectedContent === '중량' ? 'kg' : 'set'})
            </span>
            {` `}비교 데이터
          </CardTitle>
          <Select onValueChange={handleSelect} value={selectedContent}>
            <SelectTrigger className="w-20 select-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-20 min-w-0">
              {SELECT_CONTENT.map((content, idx) => (
                <SelectItem key={idx} value={content}>
                  {content}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          <div>{thisWeekLabel} (이번 주) 기준</div>

          <div
            className={cn(
              'text-muted-foreground mt-1 text-xs',
              isSameWeek ? 'opacity-0' : 'opacity-100'
            )}
          >
            {selectedWeekLabel}과 비교
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig(isSameWeek ? undefined : selectedWeekLabel)}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  formatter={(value, name) => [
                    `${value}${selectedContent === '중량' ? 'kg' : '세트'}`,
                    name,
                  ]}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />

            {/* 선택된 주 데이터를 먼저 그려서 뒤에 배치되도록 합니다. */}
            {!isSameWeek && (
              <Bar
                dataKey="selectedWeek"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            )}

            {/* 이번 주 데이터를 뒤에 그려서 선택된 주 데이터 위에 겹쳐지게 합니다. */}
            <Bar dataKey="thisWeek" fill="var(--chart-2)" radius={[4, 4, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className={cn('text-sm', isSameWeek ? 'opacity-0' : 'opacity-100')}>
        <div className="flex gap-x-1 leading-none font-medium text-slate-500">
          <span className="text-black">({selectedWeekLabel})</span>에 비해{' '}
          <span className="text-black">
            {weeklyChange.value}
            {selectedContent === '중량' ? 'kg' : '세트'}
          </span>
          <span className={weeklyChange.isIncrease ? 'text-green-500' : 'text-red-500'}>
            {weeklyChange.isIncrease ? '증가' : '감소'}
          </span>
          {weeklyChange.isIncrease ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default memo(WeekDiffChart);
