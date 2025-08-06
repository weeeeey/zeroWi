import { CommunityCategoryWithTotal, CommunityPostWithAuthorAndComments } from '@/types/community';

import prisma from '../db';

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
      comments: true,
    },
  });

  return post;
};
