/**
 * 초(seconds)를 'MM:SS' 형식의 문자열로 포맷합니다.
 *
 * @param {number} seconds - 포맷할 초 단위 시간.
 * @returns {string} 'MM:SS' 형식의 포맷된 시간 문자열.
 */
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * 분(minute)을 'X시간 Y분' 또는 'Y분' 형식의 문자열로 포맷합니다.
 * 1시간 이상인 경우 'X시간 Y분', 1시간 미만인 경우 'Y분' 형식으로 반환합니다.
 *
 * @param {number} minute - 포맷할 분 단위 시간.
 * @returns {string} 'X시간 Y분' 또는 'Y분' 형식의 포맷된 시간 문자열.
 */
export const formatTimeInHourAndMinute = (minute: number): string => {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  } else {
    return `${minutes}분`;
  }
};