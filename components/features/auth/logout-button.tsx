import { Button } from '@/components/ui/button';
import { logoutAction } from '@/lib/auth/server';

export function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await logoutAction();
      }}
    >
      <Button
        type="submit"
        className="px-2 text-sm text-white transition-colors hover:text-gray-800"
        aria-label="Sign out"
      >
        로그아웃
      </Button>
    </form>
  );
}
