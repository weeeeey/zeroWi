import Link from 'next/link';

function ProvisionFooter() {
  return (
    <footer className="border-t bg-slate-100 px-2 py-4">
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h4 className="mb-4 font-semibold text-gray-900">서비스</h4>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="#" className="hover:text-gray-900">
                운동 루틴
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                영양 관리
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                커뮤니티
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                진행상황
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-gray-900">지원</h4>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="#" className="hover:text-gray-900">
                도움말
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                문의하기
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                개인정보처리
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                이용약관
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-gray-900">연결</h4>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="#" className="hover:text-gray-900">
                블로그
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                소셜 미디어
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                뉴스레터
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>&copy; 2025 ZeroWI 팀. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default ProvisionFooter;
