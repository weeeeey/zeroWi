import { ExerciseTargetSet } from './types/record';

export const dummyRoutines = [
  {
    id: 1,
    title: 'Upper Body Strength',
    duration: '45 min',
    exercises: 8,
    difficulty: 'Intermediate',
    calories: 320,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'HIIT Cardio Blast',
    duration: '30 min',
    exercises: 6,
    difficulty: 'Advanced',
    calories: 450,
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Core & Abs',
    duration: '25 min',
    exercises: 10,
    difficulty: 'Beginner',
    calories: 180,
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Lower Body Power',
    duration: '50 min',
    exercises: 7,
    difficulty: 'Intermediate',
    calories: 380,
    color: 'bg-orange-500',
  },
  {
    id: 5,
    title: 'Full Body Circuit',
    duration: '40 min',
    exercises: 12,
    difficulty: 'Advanced',
    calories: 420,
    color: 'bg-red-500',
  },
  {
    id: 6,
    title: 'Yoga Flow',
    duration: '35 min',
    exercises: 15,
    difficulty: 'Beginner',
    calories: 150,
    color: 'bg-teal-500',
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
