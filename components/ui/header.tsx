import { getCurrentUser } from '@/lib/auth/server';
import Link from 'next/link';

import LoginButton from '../features/auth/login-button';
import HeaderAvatar from './header-avatar';

async function Header() {
  const currentUser = await getCurrentUser();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-green-300 px-4 py-2">
      <h1 className="text-2xl" aria-label="로고">
        <Link href="/">ZeroWI</Link>
      </h1>
      <div>{currentUser ? <HeaderAvatar imageUrl={currentUser.picture} /> : <LoginButton />}</div>
    </header>
  );
}

export default Header;
