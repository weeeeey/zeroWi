import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * CSS 클래스 이름을 조건부로 결합합니다.
 * `clsx`를 사용하여 조건부 클래스 결합을 처리하고, `tailwind-merge`를 사용하여 Tailwind CSS 클래스를 지능적으로 병합합니다.
 *
 * @param {...ClassValue[]} inputs - 클래스 이름, 객체 또는 배열의 목록입니다.
 * @returns {string} 병합된 CSS 클래스 이름의 단일 문자열입니다.
 *
 * @example
 * // 기본 사용법
 * cn('text-red-500', 'font-bold'); // => 'text-red-500 font-bold'
 *
 * @example
 * // 조건부 클래스
 * cn('px-2', true && 'py-1', false && 'hidden'); // => 'px-2 py-1'
 *
 * @example
 * // Tailwind CSS 클래스 병합
 * cn('px-2', 'py-1', 'px-4'); // => 'py-1 px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
