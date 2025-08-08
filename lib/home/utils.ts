import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const normalize = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getWeekdayIndex = (day: Date) => {
  const dayOfWeek = day.getDay();
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
};

export const weekLabel = (weekDays: Date[]) => {
  const [start, end] = [weekDays[0], weekDays[6]];
  const startStr = format(start, 'MM.dd', { locale: ko });
  const endStr =
    start.getFullYear() === end.getFullYear()
      ? format(end, 'MM.dd', { locale: ko })
      : format(end, 'yyyy.MM.dd', { locale: ko });
  return `${startStr} – ${endStr}`;
};
