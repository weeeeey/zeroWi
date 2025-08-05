interface PageProps {
  params: Promise<{ postId: string }>;
}

async function PostDetailPage({ params }: PageProps) {
  const { postId } = await params;
  return <div>{postId}</div>;
}

export default PostDetailPage;
