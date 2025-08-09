import { addDays, format, startOfWeek } from 'date-fns';
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
