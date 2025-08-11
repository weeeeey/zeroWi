import { CommunityCategoryWithTotal, CommunityPostWithAuthorAndComments } from '@/types/community';

import prisma from '../db';

/**
 * 커뮤니티 게시물 목록을 페이지네이션 및 검색/카테고리 필터링하여 가져옵니다.
 *
 * @param {object} params - 게시물 조회 파라미터.
 * @param {number} params.page - 현재 페이지 번호 (1부터 시작).
 * @param {string} [params.searchTitle] - 검색할 게시물 제목 (부분 일치, 대소문자 무시).
 * @param {CommunityCategoryWithTotal} [params.category] - 필터링할 카테고리 (예: '자유', '질문', '전체').
 * @returns {Promise<CommunityPostWithAuthorAndComments[]>} 필터링된 게시물 목록.
 */
export const getPosts = async ({
  page,
  searchTitle,
  category,
}: {
  page: number;
  searchTitle?: string;
  category?: CommunityCategoryWithTotal;
}) => {
  const take = 10;
  const skip = (page - 1) * take;

  const posts = await prisma.post.findMany({
    where: {
      ...(searchTitle && {
        title: {
          contains: searchTitle,
          mode: 'insensitive',
        },
      }),
      ...(category &&
        category !== '전체' && {
          category,
        }),
    },
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          name: true,
          picture: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts;
};

/**
 * 특정 ID를 가진 커뮤니티 게시물을 상세 조회합니다.
 * 게시물 작성자 정보와 댓글 목록을 함께 포함합니다.
 *
 * @param {string} id - 조회할 게시물의 ID.
 * @returns {Promise<CommunityPostWithAuthorAndComments | null>} 조회된 게시물 정보 또는 해당 ID의 게시물이 없으면 `null`.
 */
export const getPostById = async (
  id: string
): Promise<CommunityPostWithAuthorAndComments | null> => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          picture: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
        },
      },
    },
  });

  return post;
};