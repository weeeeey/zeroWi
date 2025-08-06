import { CommunityPostWithAuthorAndComments } from '@/types/community';

import prisma from '../db';

export const getPosts = async (page: number, search?: string) => {
  const take = 10;
  const skip = (page - 1) * take;

  const posts = await prisma.post.findMany({
    where: search
      ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : undefined,
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
