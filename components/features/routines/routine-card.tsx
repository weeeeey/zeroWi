'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DropDown from '@/components/ui/drop-down';
import { Routine, RoutineDifficulty } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarDays, Clock, MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CARD_COLOR: Record<RoutineDifficulty, string> = {
  숙련자: 'bg-red-500',
  중급자: 'bg-blue-500',
  초보자: 'bg-orange-500',
};

// routine-card.tsx 파일 내

function RoutineCardDropdown() {
  return (
    <DropDown
      trigger={({ onClick }) => (
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClick}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )}
      items={[
        { text: '수정', onClick: () => alert('루틴 수정') },
        { text: '삭제', onClick: () => alert('루틴 삭제'), danger: true },
      ]}
    />
  );
}

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
          <RoutineCardDropdown />
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
