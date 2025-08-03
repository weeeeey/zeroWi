import { Card, CardContent } from '@/components/ui/card';
import { Stats } from '@/types/record';

function StatCard({ stat }: { stat: Stats }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
        <div className="text-sm text-gray-500">{stat.label}</div>
        <div className="text-xs text-gray-400">{stat.unit}</div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
