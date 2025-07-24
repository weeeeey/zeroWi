'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

export default function HomePage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Container */}
      <div className="mx-auto min-h-screen max-w-sm bg-white">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-2 text-sm font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="h-1 w-1 rounded-full bg-black"></div>
              <div className="h-1 w-1 rounded-full bg-black"></div>
              <div className="h-1 w-1 rounded-full bg-black"></div>
              <div className="h-1 w-1 rounded-full bg-gray-300"></div>
            </div>
            <span className="ml-2">📶</span>
            <span>📶</span>
            <div className="h-3 w-6 rounded-sm border border-black">
              <div className="m-0.5 h-1.5 w-4 rounded-sm bg-black"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6 px-6">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search workouts..."
              className="rounded-xl border-none bg-gray-100 pl-10"
            />
          </div>
        </div>

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
        <div className="mb-4 px-6">
          <h2 className="text-xl font-bold text-gray-900">Your Routines</h2>
          <p className="text-sm text-gray-500">Choose a workout to get started</p>
        </div>

        {/* Routine Cards */}
        <div className="space-y-4 px-6 pb-24">
          {routines.map((routine) => (
            <Card key={routine.id} className="overflow-hidden border-none shadow-sm">
              <div className="relative">
                <img
                  src={routine.image || '/placeholder.svg'}
                  alt={routine.title}
                  className="h-32 w-full object-cover"
                />
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
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 w-full max-w-sm -translate-x-1/2 transform">
          <div className="mx-6 mb-6 rounded-full bg-black p-2">
            <div className="flex items-center justify-around">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-white text-black hover:bg-gray-100"
              >
                <Home className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full text-white hover:bg-gray-800"
              >
                <Calendar className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full text-white hover:bg-gray-800"
              >
                <Dumbbell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full text-white hover:bg-gray-800"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
