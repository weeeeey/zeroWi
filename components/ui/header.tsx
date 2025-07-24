import { getCurrentUser } from '@/lib/auth/server';
import { Bell } from 'lucide-react';
import Link from 'next/link';

import LoginButton from '../features/auth/login-button';
import { LogoutButton } from '../features/auth/logout-button';

async function Header() {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-green-300 px-4 py-2">
      <h1 className="text-2xl" aria-label="로고">
        <Link href="/">ZeroWI</Link>
      </h1>
      <div>
        {currentUser ? (
          <div className="flex items-center justify-center gap-x-2">
            <LogoutButton />
            <div className="rounded-full bg-slate-100 p-1">
              <Bell className="size-6" />
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}

export default Header;
