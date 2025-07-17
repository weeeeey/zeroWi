'use client';

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/lib/auth';

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button
        type="submit"
        className="text-sm text-gray-500 transition-colors hover:text-gray-800"
        aria-label="Sign out"
      >
        Sign out
      </Button>
    </form>
  );
}
