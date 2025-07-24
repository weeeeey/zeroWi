'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Bell,
  Calendar,
  Clock,
  Dumbbell,
  Home,
  MoreHorizontal,
  Play,
  Search,
  Target,
  User,
} from 'lucide-react';

const routines = [
  {
    id: 1,
    title: 'Upper Body Strength',
    duration: '45 min',
    exercises: 8,
    difficulty: 'Intermediate',
    calories: 320,
    image: '/placeholder.svg?height=120&width=200',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'HIIT Cardio Blast',
    duration: '30 min',
    exercises: 6,
    difficulty: 'Advanced',
    calories: 450,
    image: '/placeholder.svg?height=120&width=200',
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Core & Abs',
    duration: '25 min',
    exercises: 10,
    difficulty: 'Beginner',
    calories: 180,
    image: '/placeholder.svg?height=120&width=200',
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Lower Body Power',
    duration: '50 min',
    exercises: 7,
    difficulty: 'Intermediate',
    calories: 380,
    image: '/placeholder.svg?height=120&width=200',
    color: 'bg-orange-500',
  },
  {
    id: 5,
    title: 'Full Body Circuit',
    duration: '40 min',
    exercises: 12,
    difficulty: 'Advanced',
    calories: 420,
    image: '/placeholder.svg?height=120&width=200',
    color: 'bg-red-500',
  },
  {
    id: 6,
    title: 'Yoga Flow',
    duration: '35 min',
    exercises: 15,
    difficulty: 'Beginner',
    calories: 150,
    image: '/placeholder.svg?height=120&width=200',
    color: 'bg-teal-500',
  },
];
const stats = [
  { label: 'Workouts', value: '24', unit: 'this month' },
  { label: 'Calories', value: '8,420', unit: 'burned' },
  { label: 'Minutes', value: '720', unit: 'active' },
  { label: 'Streak', value: '7', unit: 'days' },
];
export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Stats Cards */}
      <div className="mb-6 px-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
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
      {/* <div className="mb-4 px-6">
        <h2 className="text-xl font-bold text-gray-900">Your Routines</h2>
        <p className="text-sm text-gray-500">Choose a workout to get started</p>
      </div> */}
      {/* Routine Cards */}
      {/* <div className="space-y-4 px-6 pb-24">
        {routines.map((routine) => (
          <Card key={routine.id} className="overflow-hidden border-none shadow-sm">
            <div className="relative">
              <div
                className={`absolute top-3 left-3 ${routine.color} rounded-full px-2 py-1 text-xs font-medium text-white`}
              >
                {routine.difficulty}
              </div>
              <Button
                size="icon"
                className="absolute top-3 right-3 rounded-full bg-white/90 text-gray-900 hover:bg-white"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{routine.title}</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {routine.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="h-4 w-4" />
                  {routine.exercises} exercises
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {routine.calories} cal
                </div>
              </div>
              <Button className="w-full rounded-xl bg-blue-500 text-white hover:bg-blue-600">
                Start Workout
              </Button>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>
  );
}
