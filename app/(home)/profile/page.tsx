import { StatItem } from '@/components/features/profile/stat-item';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getCurrentUser } from '@/lib/auth/server';
import { format } from 'date-fns';
import { Activity, BarChart3, CalendarDays, Flame, Save } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function ProfilePage() {
  const profile = await getCurrentUser();
  if (!profile) {
    redirect('/auth');
  }

  return (
    <main className="container space-y-2 px-4">
      {/* Profile card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative size-20 overflow-hidden rounded-full">
              <Image fill alt="프로필 이미지" src={profile.picture} />
            </div>

            <div className="flex-1 space-y-1">
              <CardTitle className="flex items-center gap-x-1 text-slate-900">
                <div className="text-2xl">{profile.name}</div>
                <Badge variant="secondary" className="bg-green-200">
                  일반 회원
                </Badge>
              </CardTitle>
              <div className="text-sm text-slate-500">@{profile.email}</div>
              <div className="flex items-center text-xs text-slate-500">
                <CalendarDays className="mr-1 h-3.5 w-3.5" />
                가입 {format(profile.createdAt, 'yy-mm-dd')}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-3" />
          <p className="text-sm leading-relaxed text-slate-600">랜덤 동기부여 문장 넣어주기</p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <StatItem icon={Save} label="기록 저장 횟수" value={100} />
        <StatItem icon={Activity} label="총 운동 수" value={100} />
        <StatItem icon={Flame} label="연속 일수" value={`${100}일`} />
        <StatItem icon={BarChart3} label="주 평균" value={`${100}회`} />
      </div>
    </main>
  );
}

export default ProfilePage;
