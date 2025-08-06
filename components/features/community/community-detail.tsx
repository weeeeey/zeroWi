'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

import CommunityCreateLinkButton from './community-create-link-button';

// 샘플 데이터
const post = {
  id: 1,
  title: '운동 루틴 공유합니다 - 초보자도 쉽게!',
  content: `헬스장에 처음 가시는 분들을 위한 기본 운동 루틴을 공유합니다. 3개월간 꾸준히 해보니 확실히 효과가 있더라구요.

**주 3회 운동 루틴**

**월요일 - 가슴, 삼두**
- 벤치프레스 3세트 x 10회
- 인클라인 덤벨프레스 3세트 x 12회
- 딥스 3세트 x 10회
- 트라이셉스 익스텐션 3세트 x 12회

**수요일 - 등, 이두**
- 풀업 3세트 x 8회 (못하면 랫풀다운)
- 바벨로우 3세트 x 10회
- 시티드로우 3세트 x 12회
- 바이셉스 컬 3세트 x 12회

**금요일 - 하체**
- 스쿼트 3세트 x 12회
- 데드리프트 3세트 x 8회
- 레그프레스 3세트 x 15회
- 카프레이즈 3세트 x 20회

처음에는 무게보다는 정확한 자세가 중요합니다. 천천히 시작해서 점진적으로 무게를 늘려가세요!`,
  author: {
    name: '김헬스',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  category: '운동',
  likes: 24,
  comments: 8,
  views: 156,
  createdAt: '2시간 전',
  isLiked: false,
};

const comments = [
  {
    id: 1,
    author: {
      name: '운동초보',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    content: '정말 도움이 되는 정보네요! 내일부터 바로 시작해보겠습니다. 감사합니다!',
    createdAt: '1시간 전',
    likes: 3,
  },
  {
    id: 2,
    author: {
      name: '헬스맨',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    content:
      '초보자분들한테 정말 좋은 루틴이네요. 저도 처음에 이런 루틴으로 시작했었는데 효과 좋았어요.',
    createdAt: '30분 전',
    likes: 5,
  },
];

const relatedPosts = [
  {
    id: 2,
    title: '다이어트 식단 후기 - 2개월 -8kg 성공!',
    author: '다이어터',
    category: '식단',
    views: 289,
    createdAt: '5시간 전',
  },
  {
    id: 3,
    title: '홈트레이닝 장비 추천',
    author: '홈트러버',
    category: '장비',
    views: 98,
    createdAt: '1일 전',
  },
  {
    id: 5,
    title: '단백질 보충제 비교 리뷰',
    author: '프로틴마스터',
    category: '영양',
    views: 203,
    createdAt: '2일 전',
  },
];

export default function CommunityDetail() {
  return (
    <div className="container p-0">
      {/* Back Button */}
      {/* <Link href="/community">
        <Button variant="" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          커뮤니티로 돌아가기
        </Button>
      </Link> */}

      {/* Main Content */}

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
                  {post.createdAt} • 조회 {post.views}
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
                className={post.isLiked ? 'text-red-500' : 'text-gray-500'}
              >
                <Heart className="size-5" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MessageCircle className="size-5" />
                {post.comments}
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
      <Card className="rounded-none border-none p-0 pb-20">
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
            {comments.map((comment) => (
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

{
  /* Sidebar */
}
{
  /* <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">관련 글</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/community/${relatedPost.id}`}>
                    <div className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-50">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                      </div>
                      <h4 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.author}</span>
                        <div className="flex items-center gap-2">
                          <span>조회 {relatedPost.views}</span>
                          <span>{relatedPost.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div> */
}
