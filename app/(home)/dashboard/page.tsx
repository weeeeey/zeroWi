import LoginButton from '@/components/features/auth/login-button';
import { Badge } from '@/components/ui/badge';
import { Button, buttonDefaultStyle } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/auth/server';
import { cn } from '@/lib/utils';
import { BarChart3, Calendar, Share2, Target, TrendingUp, User, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function StartButton({
  isLogin,
  className,
  text,
}: {
  isLogin: boolean;
  className: string;
  text: string;
}) {
  if (isLogin) {
    return (
      <Link className={cn(buttonDefaultStyle, className)} href="/">
        {text}
      </Link>
    );
  }
  return <LoginButton className={className} text={text} />;
}

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  const isLogin = currentUser?.id ? true : false;

  return (
    <div className="container space-y-8 bg-gradient-to-br from-slate-100 to-indigo-100">
      {/* Hero Section */}
      <section>
        <div className="grid items-center gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                📱 모바일 최적화
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900">
                <div>당신의 여정을</div>
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  함께 만들어 가겠습니다
                </span>
              </h1>
              <p className="text-sm leading-relaxed text-gray-600">
                개인 맞춤 운동 루틴을 기록하고, 다양한 루틴을 공유하며, 운동 커뮤니티와 함께
                성장하세요. ZeroWI에서 목표를 달성해보세요.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <StartButton
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                isLogin={isLogin}
                text="시작하기"
              />

              {/* 모달로 미리보기 만들기 */}
              <Button
                variant="outline"
                className="border-blue-200 bg-transparent text-blue-700 hover:bg-blue-50"
              >
                앱 미리보기
              </Button>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>무료 서비스</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>실시간 동기화</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>커뮤니티 기반</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="h-[50vh] w-full overflow-hidden rounded-md bg-indigo-800 p-2">
              <div className="relative size-full">
                <Image src="/images/app-screenshot.jpg" alt="ZeroWI 앱 스크린샷" fill />
              </div>
            </div>
            <div className="absolute inset-0 scale-105 transform rounded-3xl bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="my-16 space-y-4">
          <Badge className="ml-2 bg-indigo-200 text-sm font-bold text-indigo-700">핵심 기능</Badge>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            왜 ZeroWI를 선택해야 할까요?
          </h2>
          <p className="mx-auto max-w-2xl text-center text-gray-600">
            체계적인 운동 관리부터 활발한 커뮤니티 활동까지, 건강한 라이프스타일을 위한 모든 것을
            제공합니다.
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
            <CardContent className="px-8 py-2">
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-gradient-to-r from-slate-500 to-slate-700">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">1초만에 회원가입</h3>
              <p className="text-gray-600">
                소셜 로그인을 통해 간편한 회원가입 및 로그인이 가능해요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
            <CardContent className="px-8 py-2">
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">체중 & 진행상황 추적</h3>
              <p className="text-gray-600">
                체중 변화와 운동 진행상황을 시각적 차트로 확인하고, 목표 달성률을 실시간으로
                모니터링하세요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
            <CardContent className="px-8 py-2">
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">AI 기반 영양 관리</h3>
              <p className="text-gray-600">
                칼로리, 단백질, 탄수화물, 지방 섭취량을 체계적으로 기록하고 개인 목표에 맞는 영양
                계획을 세워보세요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
            <CardContent className="px-8 py-2">
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">커뮤니티 & 리더보드</h3>
              <p className="text-gray-600">
                다른 사용자들과 운동 세션을 공유하고, 리더보드에서 순위를 확인하며 서로 동기부여를
                받아보세요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
            <CardContent className="px-8 py-2">
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">루틴 관리</h3>
              <p className="text-gray-600">
                개인 맞춤 운동 루틴을 생성하고 일정에 맞춰 관리하세요. 다양한 운동 프로그램을
                체계적으로 계획할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
            <CardContent className="px-8 py-2">
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">루틴 공유</h3>
              <p className="text-gray-600">
                효과적인 운동 루틴을 커뮤니티와 공유하고, 다른 사용자들의 검증된 루틴을
                참고해보세요.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
            <CardContent className="px-8 py-2">
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500 to-purple-600">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">목표 달성 시스템</h3>
              <p className="text-gray-600">
                100일 챌린지와 같은 장기 목표를 설정하고, 단계별 달성 과정을 통해 꾸준한 동기부여를
                받으세요.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 p-12 text-center text-white">
          <h2 className="mb-6 text-3xl font-bold">지금부터 더 건강한 오늘을 함께 해요</h2>
          <p className="mx-auto mb-8 max-w-2xl text-left text-xl opacity-90">
            많은 이들이 남은 인생에서 제일 젊은 날을 ZeroWI에 기록하여 건강한 변화를 경험하고
            있습니다. 당신도 내일이 아닌 오늘부터 시작해보세요.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <StartButton
              isLogin={isLogin}
              className="bg-white text-blue-600 hover:bg-gray-100"
              text="무료 계정 만들기"
            />
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              더 알아보기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black py-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">서비스</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  운동 루틴
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  영양 관리
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  진행상황
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">지원</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  도움말
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  개인정보처리
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">연결</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  소셜 미디어
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  뉴스레터
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>&copy; 2025 ZeroWI 팀. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
