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
import { TrendingDown, TrendingUp } from 'lucide-react';
import { memo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
      color: 'hsl(var(--chart-1))', // 연한 회색 (배경)
    },
    thisWeek: {
      label: '이번 주',
      color: 'hsl(var(--chart-2))', // 진한 파란색 (앞)
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

  // 데이터의 크기를 비교하여 막대 순서를 결정하는 새로운 데이터 배열을 생성합니다.
  const processedChartData = chartData.map((item) => {
    if (item.thisWeek >= item.selectedWeek) {
      return {
        ...item,
        background: item.thisWeek,
        foreground: item.selectedWeek,
        backgroundColor: 'var(--chart-2)', // 이번 주 색상
        foregroundColor: 'var(--chart-1)', // 선택된 주 색상
        backgroundLabel: '이번 주',
        foregroundLabel: selectedWeekLabel,
      };
    } else {
      return {
        ...item,
        background: item.selectedWeek,
        foreground: item.thisWeek,
        backgroundColor: 'var(--chart-1)', // 선택된 주 색상
        foregroundColor: 'var(--chart-2)', // 이번 주 색상
        backgroundLabel: selectedWeekLabel,
        foregroundLabel: '이번 주',
      };
    }
  });

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
          {!isSameWeek && (
            <div className="text-muted-foreground mt-1 text-xs">{selectedWeekLabel}과 비교</div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/*
          ChartConfig를 동적으로 구성하여 범례(Legend)가 올바르게 표시되도록 합니다.
          하지만 여기서는 겹쳐진 막대를 사용하므로, 범례는 static하게 유지하는 것이 더 직관적일 수 있습니다.
          따라서, 원래의 ChartConfig를 그대로 사용하고, Bar 컴포넌트의 순서만 조정하는 것이 더 나은 방법입니다.
        */}
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

            {/*
              두 막대 중 더 큰 값을 가진 막대가 먼저 그려지도록 Bar 컴포넌트의 순서를 동적으로 조정합니다.
              이전 코드와 달리 데이터 자체를 재구성하는 것이 아니라, props를 이용해 동적으로 구성합니다.
              `recharts`에서는 `<Bar>` 컴포넌트의 순서에 따라 렌더링 순서가 결정됩니다.
              따라서, `thisWeek`이 `selectedWeek`보다 큰 경우, `thisWeek` 막대를 먼저 그리고 `selectedWeek` 막대를 그 위에 그립니다.
              반대의 경우, `selectedWeek` 막대를 먼저 그리고 `thisWeek` 막대를 그 위에 그립니다.
              이렇게 하면 항상 더 큰 막대가 아래에 깔리게 됩니다.
            */}
            {!isSameWeek && (
              <>
                {chartData.map((item, index) => {
                  const isThisWeekLarger = item.thisWeek >= item.selectedWeek;
                  const backgroundDataKey = isThisWeekLarger ? 'thisWeek' : 'selectedWeek';
                  const foregroundDataKey = isThisWeekLarger ? 'selectedWeek' : 'thisWeek';
                  const backgroundColor = isThisWeekLarger ? 'var(--chart-2)' : 'var(--chart-1)';
                  const foregroundColor = isThisWeekLarger ? 'var(--chart-1)' : 'var(--chart-2)';

                  return (
                    <Bar
                      key={`bg-${index}`}
                      dataKey={backgroundDataKey}
                      fill={backgroundColor}
                      radius={[4, 4, 0, 0]}
                      maxBarSize={60}
                    />
                  );
                })}
                {chartData.map((item, index) => {
                  const isThisWeekLarger = item.thisWeek >= item.selectedWeek;
                  const foregroundDataKey = isThisWeekLarger ? 'selectedWeek' : 'thisWeek';
                  const foregroundColor = isThisWeekLarger ? 'var(--chart-1)' : 'var(--chart-2)';

                  return (
                    <Bar
                      key={`fg-${index}`}
                      dataKey={foregroundDataKey}
                      fill={foregroundColor}
                      radius={[4, 4, 0, 0]}
                      maxBarSize={60}
                    />
                  );
                })}
              </>
            )}

            {isSameWeek && (
              <Bar dataKey="thisWeek" fill="var(--chart-2)" radius={[4, 4, 0, 0]} maxBarSize={60} />
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {!isSameWeek && (
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
              <TrendingUp className="size-4 text-green-500" />
            ) : (
              <TrendingDown className="size-4 text-red-500" />
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default memo(WeekDiffChart);
