import { ExerciseInformation } from './types/exercise';
import { Stats } from './types/record';

export const communityPosts = [
  {
    id: 1,
    title: '운동 루틴 공유합니다 - 초보자도 쉽게!',
    content:
      '헬스장에 처음 가시는 분들을 위한 기본 운동 루틴을 공유합니다. 3개월간 꾸준히 해보니 확실히 효과가 있더라구요...',
    author: {
      name: '김헬스',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    category: '운동',
    likes: 24,
    comments: 8,
    views: 156,
    createdAt: '2시간 전',
    isPopular: true,
  },
  {
    id: 2,
    title: '다이어트 식단 후기 - 2개월 -8kg 성공!',
    content:
      '안녕하세요! 2개월간 식단 관리로 8kg 감량에 성공했습니다. 제가 실제로 먹었던 식단과 팁들을 공유해드릴게요...',
    author: {
      name: '다이어터',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    category: '식단',
    likes: 42,
    comments: 15,
    views: 289,
    createdAt: '5시간 전',
    isPopular: true,
  },
  {
    id: 3,
    title: '홈트레이닝 장비 추천',
    content:
      '집에서 운동하기 좋은 장비들을 추천해드립니다. 가성비 좋은 제품들 위주로 정리했어요...',
    author: {
      name: '홈트러버',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    category: '장비',
    likes: 18,
    comments: 6,
    views: 98,
    createdAt: '1일 전',
    isPopular: false,
  },
  {
    id: 4,
    title: '러닝 초보 질문드려요',
    content:
      '러닝을 시작한지 일주일 됐는데, 무릎이 아픈게 정상인가요? 올바른 러닝 자세에 대해 알고 싶습니다...',
    author: {
      name: '러닝초보',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    category: '러닝',
    likes: 7,
    comments: 12,
    views: 67,
    createdAt: '1일 전',
    isPopular: false,
  },
  {
    id: 5,
    title: '단백질 보충제 비교 리뷰',
    content:
      '여러 브랜드의 단백질 보충제를 써본 후기입니다. 맛, 가격, 효과 등을 종합적으로 비교해봤어요...',
    author: {
      name: '프로틴마스터',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    category: '영양',
    likes: 31,
    comments: 9,
    views: 203,
    createdAt: '2일 전',
    isPopular: false,
  },
];

export const dummyWeekStats: Stats[] = [
  { label: '운동 횟수', value: '24', unit: '이번 달' },
  { label: '칼로리', value: '8,420', unit: '이번 주에 소비한 양' },
  { label: '운동 시간(분)', value: '720', unit: '이번 주에 수행한 시간' },
  { label: '연속 출석(일)', value: '7' },
];

export const dummyDayStats: Stats[] = [
  { label: '수행 세트', value: '24' },
  { label: '총 중량(kg)', value: '8,420' },
  { label: '운동 시간(분)', value: '72' },
  { label: '연속 출석(일)', value: '7' },
];

export const dummyExerciseInfos: ExerciseInformation[] = [
  {
    title: '풀업',
    target: '등',
    method: '맨몸',
    description:
      '등 전체와 이두근을 발달시키는 대표적인 맨몸 운동입니다. 광배근과 승모근 발달에 효과적입니다.',
  },
  {
    title: '바벨 로우',
    target: '등',
    method: '프리웨이트',
    description:
      '바벨을 이용해 등의 두께와 근력을 키우는 운동입니다. 등 중앙부와 광배근에 집중됩니다.',
  },
  {
    title: '랫 풀 다운',
    target: '등',
    method: '머신',
    description:
      '광배근을 집중적으로 발달시키는 머신 운동입니다. 등 너비를 키우는 데 효과적입니다.',
  },
  {
    title: '오버헤드 프레스',
    target: '어깨',
    method: '프리웨이트',
    description:
      '어깨 전체를 발달시키는 대표적인 프리웨이트 운동입니다. 삼각근의 전면, 측면, 후면을 모두 사용합니다.',
  },
  {
    title: '사이드 레터럴 레이즈',
    target: '어깨',
    method: '프리웨이트',
    description: '삼각근 측면을 집중적으로 발달시켜 어깨 너비를 넓히는 데 효과적인 운동입니다.',
  },
  {
    title: '숄더 프레스 머신',
    target: '어깨',
    method: '머신',
    description: '안정적인 자세로 어깨 근육을 고립하여 발달시킬 수 있는 머신 운동입니다.',
  },
  {
    title: '푸쉬업',
    target: '가슴',
    method: '맨몸',
    description:
      '가슴, 어깨, 삼두근을 동시에 사용하는 기본적인 맨몸 운동입니다. 다양한 변형이 가능합니다.',
  },
  {
    title: '벤치프레스',
    target: '가슴',
    method: '프리웨이트',
    description: '가슴 근육의 크기와 근력을 키우는 데 가장 효과적인 프리웨이트 운동입니다.',
  },
  {
    title: '체스트 프레스 머신',
    target: '가슴',
    method: '머신',
    description: '안정적으로 가슴 근육을 고립하여 운동할 수 있는 머신 운동입니다.',
  },
  {
    title: '딥스',
    target: '팔',
    method: '맨몸',
    description: '삼두근과 가슴 하부를 발달시키는 맨몸 운동입니다. 팔의 힘과 안정성을 요구합니다.',
  },
  {
    title: '바벨 컬',
    target: '팔',
    method: '프리웨이트',
    description: '이두근의 크기와 근력을 키우는 대표적인 프리웨이트 운동입니다.',
  },
  {
    title: '트라이셉스 익스텐션 머신',
    target: '팔',
    method: '머신',
    description: '삼두근을 집중적으로 고립하여 발달시키는 머신 운동입니다.',
  },
  {
    title: '스쿼트',
    target: '하체',
    method: '프리웨이트',
    description: '하체 전반적인 근육과 코어 근육을 발달시키는 전신 운동에 가까운 하체 운동입니다.',
  },
  {
    title: '런지',
    target: '하체',
    method: '프리웨이트',
    description:
      '하체 근력과 균형 감각을 동시에 발달시키는 운동입니다. 허벅지와 둔근에 효과적입니다.',
  },
  {
    title: '레그 프레스',
    target: '하체',
    method: '머신',
    description: '허벅지 전체와 둔근을 고중량으로 운동할 수 있는 머신 운동입니다.',
  },
  {
    title: '버피 테스트',
    target: '전신',
    method: '맨몸',
    description:
      '전신 근육을 사용하며 유산소와 무산소 운동 효과를 동시에 얻을 수 있는 고강도 맨몸 운동입니다.',
  },
  {
    title: '케틀벨 스윙',
    target: '전신',
    method: '프리웨이트',
    description:
      '전신 협응력과 코어 근육, 폭발적인 힘을 기르는 데 효과적인 운동입니다. 둔근과 햄스트링 발달에 좋습니다.',
  },
  {
    title: '로잉 머신',
    target: '전신',
    method: '머신',
    description:
      '하체, 등, 코어, 팔 등 전신 근육을 사용하며 유산소 효과까지 얻을 수 있는 운동입니다.',
  },
  // 추가된 더미 데이터 30개
  {
    title: '데드리프트',
    target: '등',
    method: '프리웨이트',
    description:
      '전신 후면 사슬을 강화하는 대표적인 운동입니다. 등, 둔근, 햄스트링 발달에 효과적입니다.',
  },
  {
    title: '바벨 숄더 프레스',
    target: '어깨',
    method: '프리웨이트',
    description:
      '어깨 전체의 근력과 크기를 키우는 데 효과적인 운동입니다. 삼각근 전면과 측면을 주로 사용합니다.',
  },
  {
    title: '인클라인 벤치프레스',
    target: '가슴',
    method: '프리웨이트',
    description: '가슴 상부를 집중적으로 발달시키는 벤치프레스 변형 운동입니다.',
  },
  {
    title: '덤벨 컬',
    target: '팔',
    method: '프리웨이트',
    description: '이두근을 고립하여 발달시키는 데 효과적인 덤벨 운동입니다.',
  },
  {
    title: '트라이셉스 푸쉬다운',
    target: '팔',
    method: '머신',
    description: '삼두근을 고립하여 발달시키는 데 효과적인 케이블 머신 운동입니다.',
  },
  {
    title: '레그 익스텐션',
    target: '하체',
    method: '머신',
    description: '대퇴사두근을 고립하여 발달시키는 데 효과적인 머신 운동입니다.',
  },
  {
    title: '레그 컬',
    target: '하체',
    method: '머신',
    description: '햄스트링을 고립하여 발달시키는 데 효과적인 머신 운동입니다.',
  },
  {
    title: '카프 레이즈',
    target: '하체',
    method: '맨몸',
    description: '종아리 근육을 발달시키는 데 효과적인 운동입니다.',
  },
  {
    title: '플랭크',
    target: '전신',
    method: '맨몸',
    description: '코어 근육을 강화하는 데 가장 기본적인 맨몸 운동입니다. 전신 안정성에 기여합니다.',
  },
  {
    title: '크런치',
    target: '전신',
    method: '맨몸',
    description: '복직근 상부를 집중적으로 발달시키는 복근 운동입니다.',
  },
  {
    title: '레그 레이즈',
    target: '전신',
    method: '맨몸',
    description: '복직근 하부를 집중적으로 발달시키는 복근 운동입니다.',
  },
  {
    title: '백 익스텐션',
    target: '등',
    method: '맨몸',
    description: '척추 기립근을 강화하여 허리 건강에 도움을 주는 운동입니다.',
  },
  {
    title: '덤벨 로우',
    target: '등',
    method: '프리웨이트',
    description: '한쪽 등 근육을 고립하여 발달시키는 데 효과적인 덤벨 운동입니다.',
  },
  {
    title: '페이스 풀',
    target: '어깨',
    method: '머신',
    description: '어깨 후면과 회전근개를 강화하는 데 효과적인 케이블 운동입니다.',
  },
  {
    title: '케이블 크로스오버',
    target: '가슴',
    method: '머신',
    description: '가슴 안쪽과 하부를 발달시키는 데 효과적인 케이블 운동입니다.',
  },
  {
    title: '해머 컬',
    target: '팔',
    method: '프리웨이트',
    description: '이두근과 전완근을 동시에 발달시키는 덤벨 운동입니다.',
  },
  {
    title: '오버헤드 덤벨 익스텐션',
    target: '팔',
    method: '프리웨이트',
    description: '삼두근 장두를 집중적으로 발달시키는 덤벨 운동입니다.',
  },
  {
    title: '힙 쓰러스트',
    target: '하체',
    method: '프리웨이트',
    description:
      '둔근을 가장 강력하게 활성화시키는 운동입니다. 둔근의 크기와 근력 발달에 매우 효과적입니다.',
  },
  {
    title: '굿모닝',
    target: '하체',
    method: '프리웨이트',
    description: '햄스트링과 둔근, 허리 기립근을 동시에 강화하는 운동입니다.',
  },
  {
    title: '시티드 로우',
    target: '등',
    method: '머신',
    description: '등 중앙부의 두께를 키우는 데 효과적인 머신 운동입니다.',
  },
  {
    title: '덤벨 숄더 프레스',
    target: '어깨',
    method: '프리웨이트',
    description: '어깨 전체를 발달시키는 데 효과적인 덤벨 운동입니다. 가동 범위가 넓습니다.',
  },
  {
    title: '케이블 플라이',
    target: '가슴',
    method: '머신',
    description: '가슴 근육을 고립하여 스트레칭과 수축을 극대화하는 운동입니다.',
  },
  {
    title: '프리쳐 컬',
    target: '팔',
    method: '머신',
    description: '이두근을 완전히 고립하여 운동할 수 있는 머신 운동입니다.',
  },
  {
    title: '라잉 트라이셉스 익스텐션',
    target: '팔',
    method: '프리웨이트',
    description: '삼두근을 집중적으로 발달시키는 프리웨이트 운동입니다.',
  },
  {
    title: '핵 스쿼트',
    target: '하체',
    method: '머신',
    description: '대퇴사두근을 고립하여 고중량으로 운동할 수 있는 머신 스쿼트입니다.',
  },
  {
    title: '스티프 레그드 데드리프트',
    target: '하체',
    method: '프리웨이트',
    description: '햄스트링과 둔근을 집중적으로 발달시키는 데드리프트 변형 운동입니다.',
  },
  {
    title: '하이퍼 익스텐션',
    target: '등',
    method: '맨몸',
    description: '척추 기립근과 둔근을 강화하는 데 효과적인 운동입니다.',
  },
  {
    title: '바이시클 크런치',
    target: '전신',
    method: '맨몸',
    description: '복근 전체와 외복사근을 발달시키는 복근 운동입니다.',
  },
  {
    title: '행잉 레그 레이즈',
    target: '전신',
    method: '맨몸',
    description: '복근 하부와 코어 근력을 강화하는 고난도 복근 운동입니다.',
  },
  {
    title: '풀다운',
    target: '등',
    method: '머신',
    description: '광배근의 너비를 키우는 데 효과적인 머신 운동입니다.',
  },
];
