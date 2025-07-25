import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExerciseMethod } from '@/types/record';
import { Routine, RoutineDifficulty } from '@prisma/client';
import { format } from 'date-fns';
import {
  BicepsFlexed,
  CalendarDays,
  Clock,
  Dumbbell,
  MoreHorizontal,
  Play,
  Target,
} from 'lucide-react';
import React from 'react';
import { CalendarDay } from 'react-day-picker';

const CARD_COLOR: Record<RoutineDifficulty, string> = {
  숙련자: 'bg-red-500',
  중급자: 'bg-blue-500',
  초보자: 'bg-orange-500',
};

function RoutineCard({ routine }: { routine: Routine }) {
  return (
    <Card key={routine.id} className="border-none p-0 shadow-sm">
      <div
        className={`${CARD_COLOR[routine.difficulty]} mt-4 ml-2 inline-block w-12 rounded-full px-2 py-1 text-xs font-medium text-white`}
      >
        {routine.difficulty}
      </div>

      <CardContent className="p-4 pt-0">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-gray-900">{routine.title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {routine.executeCount}회 수행
          </div>

          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {format(routine.latestExecuteDate, 'yy.MM.dd')}
          </div>
        </div>
        <Button className="w-full rounded-xl bg-blue-500 text-white hover:bg-blue-600">
          Start Workout
        </Button>
      </CardContent>
    </Card>
  );
}

export default RoutineCard;
