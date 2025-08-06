import { Plus } from 'lucide-react';
import Link from 'next/link';

function CommunityCreateLinkButton() {
  return (
    <Link
      href={'/community/create'}
      className="fixed bottom-6 left-1/2 z-10 translate-x-[calc(8rem+1px)] -translate-y-full cursor-pointer rounded-full bg-blue-400 p-4 ring-1 ring-indigo-500 ring-offset-2 hover:bg-blue-500"
    >
      <Plus className="size-7 text-white" />
    </Link>
  );
}

export default CommunityCreateLinkButton;
