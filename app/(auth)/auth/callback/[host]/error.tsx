'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthErrorPage({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-4">
      <h2>{error.message}</h2>
      <Button>
        <Link href="/auth">로그인 페이지로 이동</Link>
      </Button>
      <Button>
        <Link href="/helpDesk">고객센터로 이동</Link>
      </Button>
    </div>
  );
}
