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
        className="text-sm text-gray-500 transition-colors hover:text-gray-800"
        aria-label="Sign out"
      >
        로그아웃
      </Button>
    </form>
  );
}
