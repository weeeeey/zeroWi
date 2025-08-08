import HomeContainer from '@/components/features/home/home-container';
import { getCurrentUser } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    redirect('/dashboard');
  }
  return <HomeContainer profileCreateAt={currentUser.createdAt} profileId={currentUser.id} />;
}

{
  /* Stats Cards */
}
{
  /* <div className="grid grid-cols-2 gap-3">
    {dummyStats.map((stat, index) => (
      <StatCard key={index} stat={stat} />
    ))}
  </div> */
}
