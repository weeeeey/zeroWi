import { Comment, Post } from '@prisma/client';

export type CommunityCategory = '일반' | '운동' | '식단' | '장비' | '질문';

export type CommunityCategoryWithTotal = CommunityCategory | '전체';

export type CommunityPostWithAuthorAndComments = Post & {
  author: {
    name: string;
    picture: string;
  };
  comments: Comment[];
};
