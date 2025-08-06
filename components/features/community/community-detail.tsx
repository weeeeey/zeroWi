'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { dummyComments } from '@/dummy';
import { CommunityPostWithAuthorAndComments } from '@/types/community';
import { format } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

import CommunityCreateLinkButton from './community-create-link-button';

/**
 *  TODO : 페이지 최하단에 이전 글 다음 글 보여주기
 */

export default function CommunityDetail({ post }: { post: CommunityPostWithAuthorAndComments }) {
  return (
    <div className="container p-0">
      {/* Post */}
      <Card className="rounded-none border-none p-0">
        <CardContent className="space-y-4 p-0 py-4">
          {/* Post Header */}
          {/* Post Title */}
          <header className="space-y-2 px-2">
            <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>

            <div className="flex items-center gap-4">
              {/* 아바타 */}
              <div className="size-8 overflow-hidden rounded-full bg-black">
                <div className="size-full" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{post.author.name}</span>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                    {post.category}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {format(post.createdAt, 'yy-mm-dd')} • 조회 {post.views}
                </div>
              </div>
            </div>
          </header>

          <div className="px-4">
            <Separator />
          </div>

          {/* Post Content */}
          <div className="px-4">
            <div className="leading-relaxed whitespace-pre-wrap text-gray-700">{post.content}</div>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-x-1">
              <Button
                variant="ghost"
                size="lg"
                // className={post.isLiked ? 'text-red-500' : 'text-gray-500'}
                className="text-red-500"
              >
                <Heart className="size-5 fill-red-500" />
                212
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MessageCircle className="size-5" />
                120
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Share2 className="size-5" />
              공유
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="rounded-none border-none p-0 pb-36">
        <CardContent className="space-y-4 py-2">
          {/* Comment Form */}
          <div>
            <Textarea placeholder="댓글을 작성해주세요..." className="mb-3" />
            <div className="flex justify-end">
              <Button className="bg-indigo-600 hover:bg-indigo-700">댓글 등록</Button>
            </div>
          </div>

          <Separator />

          {/* Comments List */}
          <div className="space-y-6">
            {dummyComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                {/* 아바타 */}
                <div className="size-8 overflow-hidden rounded-full bg-black">
                  <div className="size-full" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.author.name}</span>
                    <span className="text-xs text-gray-500">{comment.createdAt}</span>
                  </div>
                  <p className="mb-2 text-sm text-gray-700">{comment.content}</p>
                  {/* <Button variant="ghost" size="sm" className="h-6 px-2 text-gray-500">
                    <Heart className="mr-1 h-3 w-3" />
                    {comment.likes}
                  </Button> */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CommunityCreateLinkButton />
    </div>
  );
}
