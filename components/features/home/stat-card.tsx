import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Stats } from '@/types/record';

function StatCard({ stat, bgColor }: { stat: Stats; bgColor?: string }) {
  return (
    <Card className={cn('border-none bg-orange-200 shadow-sm', bgColor)}>
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
        <div className="text-sm text-gray-700">{stat.label}</div>
        <div className="text-xs text-gray-600">{stat.unit}</div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
