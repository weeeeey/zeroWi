import { Routine } from '@prisma/client';

import { ExerciseTargetSet } from './types/record';

export const dummyRoutines: Routine[] = [
  {
    id: '1',
    title: 'Upper Body Strength',
    executeCount: 120,
    latestExecuteDate: new Date(),
    difficulty: '숙련자',
    days: '30',
    description: '루틴 설명',
    isShared: true,
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'HIIT Cardio Blast',
    executeCount: 120,
    latestExecuteDate: new Date(),
    difficulty: '중급자',
    days: '30',
    description: '루틴 설명',
    isShared: true,
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Core & Abs',
    executeCount: 120,
    latestExecuteDate: new Date(),
    difficulty: '초보자',
    days: '30',
    description: '루틴 설명',
    isShared: true,
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Lower Body Power',
    executeCount: 120,
    latestExecuteDate: new Date(),
    difficulty: '숙련자',
    days: '30',
    description: '루틴 설명',
    isShared: true,
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Full Body Circuit',
    executeCount: 120,
    latestExecuteDate: new Date(),
    difficulty: '중급자',
    days: '30',
    description: '루틴 설명',
    isShared: true,
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: 'Yoga Flow',
    executeCount: 120,
    latestExecuteDate: new Date(),
    difficulty: '초보자',
    days: '30',
    description: '루틴 설명',
    isShared: true,
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export const dummyStats = [
  { label: 'Workouts', value: '24', unit: 'this month' },
  { label: 'Calories', value: '8,420', unit: 'burned' },
  { label: 'Minutes', value: '720', unit: 'active' },
  { label: 'Streak', value: '7', unit: 'days' },
];

export const dummyExerciseData: ExerciseTargetSet[] = [
  // 등 운동
  {
    name: '랫 풀 다운',
    method: '머신',
    targetBodys: ['등'],
    sets: [
      { reps: '12회', weight: '40kg', restTime: 60 },
      { reps: '10회', weight: '45kg', restTime: 60 },
      { reps: '8회', weight: '50kg', restTime: 90 },
    ],
  },
  {
    name: '바벨 로우',
    method: '프리웨이트',
    targetBodys: ['등'],
    sets: [
      { reps: '10회', weight: '50kg', restTime: 90 },
      { reps: '8회', weight: '55kg', restTime: 90 },
      { reps: '8회', weight: '60kg', restTime: 120 },
    ],
  },
  {
    name: '풀업',
    method: '맨몸',
    targetBodys: ['등', '팔'],
    sets: [
      { reps: '실패 지점까지', weight: '자신 체중', restTime: 120 },
      { reps: '실패 지점까지', weight: '자신 체중', restTime: 120 },
      { reps: '실패 지점까지', weight: '자신 체중', restTime: 120 },
    ],
  },

  // 어깨 운동
  {
    name: '숄더 프레스 머신',
    method: '머신',
    targetBodys: ['어깨'],
    sets: [
      { reps: '12회', weight: '30kg', restTime: 60 },
      { reps: '10회', weight: '35kg', restTime: 60 },
      { reps: '8회', weight: '40kg', restTime: 90 },
    ],
  },
  {
    name: '덤벨 숄더 프레스',
    method: '프리웨이트',
    targetBodys: ['어깨'],
    sets: [
      { reps: '10회', weight: '각 15kg', restTime: 90 },
      { reps: '8회', weight: '각 17.5kg', restTime: 90 },
      { reps: '8회', weight: '각 20kg', restTime: 120 },
    ],
  },
  {
    name: '푸쉬업 (파이크 푸쉬업 변형)',
    method: '맨몸',
    targetBodys: ['어깨', '가슴'],
    sets: [
      { reps: '15회', weight: '자신 체중', restTime: 60 },
      { reps: '12회', weight: '자신 체중', restTime: 60 },
      { reps: '10회', weight: '자신 체중', restTime: 90 },
    ],
  },

  // 가슴 운동
  {
    name: '체스트 프레스 머신',
    method: '머신',
    targetBodys: ['가슴'],
    sets: [
      { reps: '12회', weight: '50kg', restTime: 60 },
      { reps: '10회', weight: '55kg', restTime: 60 },
      { reps: '8회', weight: '60kg', restTime: 90 },
    ],
  },
  {
    name: '벤치 프레스',
    method: '프리웨이트',
    targetBodys: ['가슴', '어깨', '팔'],
    sets: [
      { reps: '10회', weight: '60kg', restTime: 90 },
      { reps: '8회', weight: '65kg', restTime: 90 },
      { reps: '8회', weight: '70kg', restTime: 120 },
    ],
  },
  {
    name: '푸쉬업',
    method: '맨몸',
    targetBodys: ['가슴', '어깨', '팔'],
    sets: [
      { reps: '20회', weight: '자신 체중', restTime: 60 },
      { reps: '15회', weight: '자신 체중', restTime: 60 },
      { reps: '12회', weight: '자신 체중', restTime: 90 },
    ],
  },

  // 팔 운동
  {
    name: '바이셉스 컬 머신',
    method: '머신',
    targetBodys: ['팔'],
    sets: [
      { reps: '15회', weight: '20kg', restTime: 45 },
      { reps: '12회', weight: '22.5kg', restTime: 45 },
      { reps: '10회', weight: '25kg', restTime: 60 },
    ],
  },
  {
    name: '덤벨 컬',
    method: '프리웨이트',
    targetBodys: ['팔'],
    sets: [
      { reps: '12회', weight: '각 8kg', restTime: 60 },
      { reps: '10회', weight: '각 10kg', restTime: 60 },
      { reps: '8회', weight: '각 12kg', restTime: 90 },
    ],
  },
  {
    name: '트라이셉스 딥스 (벤치 이용)',
    method: '맨몸',
    targetBodys: ['팔', '어깨'],
    sets: [
      { reps: '15회', weight: '자신 체중', restTime: 60 },
      { reps: '12회', weight: '자신 체중', restTime: 60 },
      { reps: '10회', weight: '자신 체중', restTime: 90 },
    ],
  },

  // 하체 운동
  {
    name: '레그 프레스',
    method: '머신',
    targetBodys: ['하체'],
    sets: [
      { reps: '15회', weight: '100kg', restTime: 60 },
      { reps: '12회', weight: '110kg', restTime: 90 },
      { reps: '10회', weight: '120kg', restTime: 120 },
    ],
  },
  {
    name: '바벨 스쿼트',
    method: '프리웨이트',
    targetBodys: ['하체', '전신'],
    sets: [
      { reps: '10회', weight: '70kg', restTime: 120 },
      { reps: '8회', weight: '80kg', restTime: 120 },
      { reps: '5회', weight: '90kg', restTime: 180 },
    ],
  },
  {
    name: '스쿼트',
    method: '맨몸',
    targetBodys: ['하체'],
    sets: [
      { reps: '20회', weight: '자신 체중', restTime: 60 },
      { reps: '20회', weight: '자신 체중', restTime: 60 },
      { reps: '20회', weight: '자신 체중', restTime: 90 },
    ],
  },

  // 전신 운동 (주로 복합적인 운동)
  {
    name: '파워 클린 (데드리프트와 유사)',
    method: '프리웨이트',
    targetBodys: ['전신', '하체', '등', '어깨'],
    sets: [
      { reps: '5회', weight: '40kg', restTime: 120 },
      { reps: '5회', weight: '45kg', restTime: 120 },
      { reps: '5회', weight: '50kg', restTime: 180 },
    ],
  },
  {
    name: '버피 테스트',
    method: '맨몸',
    targetBodys: ['전신', '하체', '가슴', '팔'],
    sets: [
      { reps: '10회', weight: '자신 체중', restTime: 60 },
      { reps: '10회', weight: '자신 체중', restTime: 60 },
      { reps: '10회', weight: '자신 체중', restTime: 90 },
    ],
  },
];
