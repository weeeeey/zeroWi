import CommunityDetail from '@/components/features/community/community-detail';
import { getPostById } from '@/lib/community/server';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ postId: string }>;
}

async function PostDetailPage({ params }: PageProps) {
  const { postId } = await params;
  const post = await getPostById(postId);
  if (!post) {
    redirect('/community');
  }

  return <CommunityDetail post={post} />;
}

export default PostDetailPage;
