'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/custom-toaster';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/hooks/use-user';
import { CommentWithAuthor, CommunityPostWithAuthorAndComments } from '@/types/community';
import { format } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

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
              <div className="relative size-10 overflow-hidden rounded-full">
                <Image fill alt="작성자 이미지" src={post.author.picture} />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{post.author.name}</span>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                    {post.category}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {format(post.createdAt, 'yy-MM-dd')} • 조회 {post.views}
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
      <CommentS comments={post.comments} postId={post.id} />

      <CommunityCreateLinkButton />
    </div>
  );
}

function CommentS({ comments, postId }: { comments: CommentWithAuthor[]; postId: string }) {
  const router = useRouter();
  const { userId } = useUser();
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSubmit = async () => {
    try {
      if (!content) {
        window.alert('댓글 내용을 입력해주세요.');
        return;
      }
      setIsDisabled(true);
      const res = await fetch('/api/community/post/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          postId,
          authorId: userId,
        }),
      });

      const parsedData = await res.json();
      if (!parsedData.success) {
        throw new Error('댓글 등록 실패');
      }
      setContent('');
      router.refresh();
    } catch {
      toast('댓글 등록 실패', {
        variant: 'danger',
      });
    } finally {
      setIsDisabled(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length >= 199) {
      window.alert('댓글 내용은 최대 200자 입니다.');
      return;
    }
    setContent(value);
  };

  return (
    <Card className="rounded-none border-none p-0 pb-36">
      <CardContent className="space-y-4 py-2">
        {/* Comment Form */}
        <div>
          <Textarea
            value={content}
            onChange={handleChange}
            placeholder="댓글을 작성해주세요..."
            disabled={isDisabled}
            className="mb-3 h-20"
            maxLength={200}
          />
          <div className="flex justify-end">
            <Button
              disabled={isDisabled}
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              댓글 등록
            </Button>
          </div>
        </div>

        <Separator />

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              {/* 아바타 */}
              <div className="size-8 overflow-hidden rounded-full bg-black">
                <div className="size-full" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm font-medium">{comment.author.name}</span>
                  <span className="text-xs text-gray-500">
                    {format(comment.createdAt, 'yy-MM-dd')}
                  </span>
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
  );
}
