'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface DropDownItem {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean; // 빨간색 강조용
}

interface DropDownProps {
  trigger: (props: { onClick: () => void }) => ReactNode;
  items: DropDownItem[];
}

function DropDown({ trigger, items }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {trigger({ onClick: toggleOpen })}

      {isOpen && (
        <div className="absolute right-0 z-20 mt-1 min-w-[8rem] origin-top-right overflow-hidden rounded-md bg-black text-white shadow-lg ring-1 ring-black/5">
          {items.map(({ text, onClick, disabled, danger }, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!disabled) {
                  onClick();
                  setIsOpen(false);
                }
              }}
              disabled={disabled}
              className={`block w-full cursor-pointer px-4 py-2 text-left text-sm hover:bg-white/30 ${
                danger ? 'font-bold text-red-500' : ''
              } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
