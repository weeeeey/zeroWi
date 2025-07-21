import { getCurrentUser } from '@/lib/auth';

async function Header() {
  const currentUser = await getCurrentUser();
  return (
    <header className="sticky top-0 flex items-center justify-between bg-green-200 px-4 py-2">
      <h1 className="text-2xl">ZeroWI</h1>
      <div>
        {currentUser ? (
          <div>
            <div>로그아웃</div>
            <div>알람 아이콘</div>
          </div>
        ) : (
          <div>로그인</div>
        )}
      </div>
    </header>
  );
}

export default Header;
