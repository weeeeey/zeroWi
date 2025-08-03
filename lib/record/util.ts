export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatTimeInHourAndMinute = (minute: number): string => {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;

  if (hours > 0) {
    // 1시간 이상인 경우 '몇 시간 몇 분' 형식으로 반환
    return `${hours}시간 ${minutes}분`;
  } else {
    // 1시간 미만인 경우 '몇 분' 형식으로 반환
    return `${minutes}분`;
  }
};
