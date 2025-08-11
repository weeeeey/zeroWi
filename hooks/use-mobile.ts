import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * 현재 뷰포트 너비가 모바일 기기에 해당하는지 판단하는 커스텀 React 훅입니다.
 * 윈도우 리사이즈 이벤트를 수신하고 그에 따라 상태를 업데이트합니다.
 *
 * @returns {boolean} 현재 뷰포트 너비가 `MOBILE_BREAKPOINT`보다 작으면 `true`를, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   return (
 *     <div>
 *       {isMobile ? '현재 모바일 기기입니다.' : '현재 데스크톱 기기입니다.'}
 *     </div>
 *   );
 * }
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}