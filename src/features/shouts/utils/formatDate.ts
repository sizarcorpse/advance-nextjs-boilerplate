import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

export const formatDate = (date: Date, locale: any): string => {
  const now = new Date();
  const diffMinutes = differenceInMinutes(now, date);

  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }

  const diffHours = differenceInHours(now, date);
  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  const diffDays = differenceInDays(now, date);
  if (diffDays < 365) {
    return format(date, "MMM d", { locale });
  }

  return format(date, "MMM d, yyyy", { locale });
};
