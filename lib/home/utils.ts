import { addDays, format, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 주어진 날짜의 시간을 00:00:00으로 정규화합니다.
 * 날짜 비교 시 시간 요소를 무시하고 날짜만으로 비교할 수 있도록 합니다.
 *
 * @param {Date} date - 정규화할 날짜 객체.
 * @returns {Date} 시간이 00:00:00으로 설정된 새로운 날짜 객체.
 */
export const normalize = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

/**
 * 주어진 날짜의 요일 인덱스를 반환합니다.
 * 일요일(0)을 6으로, 월요일(1)을 0으로 매핑하여 월요일부터 시작하는 주간 인덱스를 제공합니다.
 *
 * @param {Date} day - 요일 인덱스를 가져올 날짜 객체.
 * @returns {number} 월요일(0)부터 시작하는 요일 인덱스 (0-6).
 */
export const getWeekdayIndex = (day: Date) => {
  const dayOfWeek = day.getDay();
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
};

/**
 * 주어진 주간 날짜 배열을 기반으로 주간 라벨 문자열을 생성합니다.
 * (예: '01.01 – 01.07' 또는 '2023.01.01 – 2024.01.07')
 *
 * @param {Date[]} weekDays - 7개의 날짜로 구성된 주간 날짜 배열.
 * @returns {string} 주간을 나타내는 라벨 문자열.
 */
export const weekLabel = (weekDays: Date[]) => {
  const [start, end] = [weekDays[0], weekDays[6]];
  const startStr = format(start, 'MM.dd', { locale: ko });
  const endStr =
    start.getFullYear() === end.getFullYear()
      ? format(end, 'MM.dd', { locale: ko })
      : format(end, 'yyyy.MM.dd', { locale: ko });
  return `${startStr} – ${endStr}`;
};

/**
 * 주어진 날짜를 포함하는 주의 주간 라벨 문자열을 생성합니다.
 * (예: '01.01 – 01.07' 또는 '2023.01.01 – 2024.01.07')
 * 주의 시작은 월요일로 간주합니다.
 *
 * @param {Date} date - 주간 라벨을 생성할 기준 날짜 객체.
 * @returns {string} 해당 주간을 나타내는 라벨 문자열.
 */
export const weekLabelFromDate = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const startStr = format(weekDays[0], 'MM.dd', { locale: ko });
  const endStr =
    weekDays[0].getFullYear() === weekDays[6].getFullYear()
      ? format(weekDays[6], 'MM.dd', { locale: ko })
      : format(weekDays[6], 'yyyy.MM.dd', { locale: ko });
  return `${startStr} – ${endStr}`;
};