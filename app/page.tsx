'use client';

import RoutineCard from '@/components/features/routines/routine-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dummyRoutines, dummyStats } from '@/dummy';
import { Clock, Dumbbell, MoreHorizontal, Play, Target } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container">
      {/* Stats Cards */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          {dummyStats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.unit}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Your Routines</h2>
        <p className="text-sm text-gray-500">Choose a workout to get started</p>
      </div>
      {/* Routine Cards */}
      <div className="space-y-4">
        {dummyRoutines.map((routine) => (
          <RoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </div>
  );
}
