import { CommunityCategory, CommunityCategoryWithTotal } from '@/types/community';

/**
 * 커뮤니티 게시물에 사용되는 카테고리 목록입니다.
 */
export const communityCategories: CommunityCategory[] = ['운동', '식단', '장비', '질문', '일반'];

/**
 * 커뮤니티 게시물 카테고리 목록에 '전체' 옵션이 추가된 버전입니다.
 */
export const communityCategoriesWithTotal: CommunityCategoryWithTotal[] = [
  '전체',
  '운동',
  '식단',
  '장비',
  '질문',
  '일반',
];