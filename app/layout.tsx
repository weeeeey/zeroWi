import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import Provider from '@/provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

const fonts = `${geistSans.variable} ${geistMono.variable} ${pretendard.variable} antialiased`;

export const metadata: Metadata = {
  title: '제로위 - 피트니스 루틴 관리 및 공유 플랫폼',
  description:
    '제로위에서 개인 피트니스 루틴을 기록하고, 다양한 루틴을 공유하며 함께 성장하세요. 운동 커뮤니티와 함께 목표를 달성해보세요.',
  keywords: ['피트니스', '운동 루틴', '운동 기록', '헬스', '커뮤니티', '루틴 공유', '제로위'],
  authors: [{ name: '제로위 팀' }],
  creator: '제로위',
  metadataBase: new URL(process.env.DEPLOY_URL!),
  openGraph: {
    title: '제로위 - 피트니스 루틴 관리 및 공유 플랫폼',
    description: '운동 루틴을 기록하고 공유하며 성장하는 커뮤니티, 제로위에서 시작하세요.',
    url: process.env.DEPLOY_URL!,
    siteName: '제로위',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '제로위 - 피트니스 루틴 관리 및 공유 플랫폼',
    description: '개인 맞춤 운동 루틴 기록 및 공유 플랫폼, 제로위에서 함께 성장하세요.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Provider>
        <body className={`${fonts} flex h-full flex-col justify-end overflow-x-hidden outline-1`}>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
