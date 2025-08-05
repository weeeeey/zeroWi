import { getCurrentUser } from '@/lib/auth/server';
import Link from 'next/link';

import LoginButton from '../features/auth/login-button';
import HeaderAvatar from './header-avatar';

async function Header() {
  const currentUser = await getCurrentUser();

  return (
    <header className="sticky top-0 left-0 z-40 flex h-16 items-center justify-between bg-indigo-600 px-4 py-2">
      <h1 className="text-2xl font-bold text-white" aria-label="로고">
        <Link href="/">ZeroWI</Link>
      </h1>
      <div className="relative">
        {currentUser ? (
          <HeaderAvatar userId={currentUser.id} imageUrl={currentUser.picture} />
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}

export default Header;
