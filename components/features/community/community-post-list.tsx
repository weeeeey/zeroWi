import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getPosts } from '@/lib/community/server';
import { CommunityCategoryWithTotal } from '@/types/community';
import { format } from 'date-fns';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';

async function CommunityPostList({
  curPage,
  search,
  category,
}: {
  search: string;
  curPage: number;
  category: CommunityCategoryWithTotal;
}) {
  const posts = await getPosts({ page: curPage, searchTitle: search, category });

  return (
    <div className="space-y-4 px-2">
      {posts.map((post) => (
        <Card key={post.id} className="p-0 transition-shadow hover:shadow-md">
          <CardContent className="px-0 pt-6 pb-2">
            {/* 작성자 정보 및 포스트 태그 */}
            <div className="mb-2 flex items-start gap-x-2 px-4">
              {/* 작성자 이미지 */}
              <div className="size-10 rounded-full bg-black" />
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                    {post.category}
                  </Badge>
                  {post.isPopular && (
                    <Badge variant="destructive" className="bg-orange-500">
                      인기
                    </Badge>
                  )}
                </div>
                <span className="mt-[1px] ml-[2px] text-xs font-medium text-gray-700">
                  {post.author.name}
                </span>
              </div>
            </div>

            <Link
              href={`/community/${post.id}`}
              className="group mx-1 block flex-1 rounded-md px-2 py-1 transition-all hover:bg-slate-100"
            >
              <h3 className="mb-2 cursor-pointer text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                {post.title}
              </h3>

              <p className="mb-6 line-clamp-2 text-gray-600">{post.content}</p>

              {/* 포스트 추가 정보 */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{format(post.createdAt, 'yy-MM-dd')}</span>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post._count.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CommunityPostList;
