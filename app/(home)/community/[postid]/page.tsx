import CommunityDetail from '@/components/features/community/community-detail';
import { getPostById } from '@/lib/community/server';

interface PageProps {
  params: Promise<{ postId: string }>;
}

async function PostDetailPage({ params }: PageProps) {
  const { postId } = await params;
  // const post = await getPostById(postId);

  return <CommunityDetail />;
}

export default PostDetailPage;
