import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';

import LoginButton from '../features/auth/login-button';

async function Header() {
  const currentUser = await getCurrentUser();
  return (
    <header className="sticky top-0 flex items-center justify-between bg-green-200 px-4 py-2">
      <h1 className="text-2xl" aria-label="로고">
        <Link href="/">ZeroWI</Link>
      </h1>
      <div>
        {currentUser ? (
          <div>
            <div>로그아웃</div>
            <div>알람 아이콘</div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}

export default Header;
