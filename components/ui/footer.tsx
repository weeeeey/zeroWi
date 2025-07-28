'use client';

import { cn } from '@/lib/utils';
import { Dumbbell, House, LucideIcon, NotepadText, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent, MouseEventHandler, useCallback, useState } from 'react';

interface FooterItemProps {
  href: string;
  currentPage: string;
  icon: LucideIcon;
}

function FooterItem({ href, currentPage, icon: Icon }: FooterItemProps) {
  const isSelected = href === currentPage;
  return (
    <Link
      href={`${href}`}
      className={cn(
        'rounded-full p-4',
        isSelected ? 'bg-white text-black' : 'bg-slate-600 text-white hover:bg-slate-500'
      )}
    >
      <Icon className="size-6 stroke-1" />
    </Link>
  );
}

function XButton({ handleOpen, isOpen }: { handleOpen: () => void; isOpen: boolean }) {
  return (
    <button
      onClick={handleOpen}
      className="relative size-14 cursor-pointer rounded-full bg-slate-600 hover:bg-slate-500"
      aria-label={isOpen ? 'open navigation' : 'close navigation'}
    >
      <div
        className={`absolute top-1 left-1/2 h-8 w-[1.5px] origin-left -translate-x-1/2 bg-white duration-300 ${isOpen ? 'translate-y-1 rotate-45' : 'rotate-90'}`}
      />
      <div
        className={`absolute top-3 left-1/2 h-8 w-[1.5px] origin-left -translate-x-1/2 bg-white duration-300 ${isOpen ? '-translate-y-1 rotate-45' : 'rotate-90'}`}
      />
      <div
        className={`absolute top-5 left-1/2 h-8 w-[1.5px] origin-left -translate-x-1/2 bg-white duration-300 ${isOpen ? '-translate-y-[10px] -rotate-45' : 'rotate-90'}`}
      />
      <div />
    </button>
  );
}

function Footer() {
  const pathname = usePathname();
  const currentPage = `/${pathname.split('/')[1]}`;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen((p) => !p), []);
  const handleItemClick = (e: MouseEvent) => {
    const targetAnchor = (e.target as HTMLElement).closest('a');
    if (targetAnchor) {
      setIsOpen(false);
    }
  };

  return (
    <footer
      className={cn(
        'fixed bottom-4 left-1/2 z-50 rounded-full bg-black p-1 transition-all duration-300 ease-in-out',
        isOpen ? '-translate-x-1/2' : 'translate-x-32 delay-500'
      )}
    >
      <nav
        className={`flex items-center justify-between ${isOpen ? 'gap-x-2 delay-500' : 'gap-x-0'}`}
      >
        <ul
          onClick={handleItemClick}
          className={`flex origin-right items-center justify-between overflow-hidden duration-300 ${isOpen ? 'w-64 scale-x-100 delay-500' : 'w-0 scale-x-0'}`}
        >
          <FooterItem href="/" icon={House} currentPage={currentPage} />
          <FooterItem href="/record" icon={NotepadText} currentPage={currentPage} />
          <FooterItem href="/routines" icon={Dumbbell} currentPage={currentPage} />
          <FooterItem href="/profile" icon={User} currentPage={currentPage} />
        </ul>
        <XButton isOpen={isOpen} handleOpen={handleOpen} />
      </nav>
    </footer>
  );
}

export default Footer;
