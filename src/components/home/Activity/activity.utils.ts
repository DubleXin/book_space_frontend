import type { activityBadgeData } from "./activity.types";

export const toMonDD = (
  data: string,
  timezone?: string
): { numeric: string; formatted: string } => {
  return {
    numeric: new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      timeZone: timezone,
    }).format(new Date(data)),
    formatted: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      timeZone: timezone,
    }).format(new Date(data)),
  };
};

export const sortBadges = (
  a: activityBadgeData,
  b: activityBadgeData
): number => {
  const [aMonth, aDay] = a.timestamp.numeric
    .split("/")
    .map((s) => Number.parseInt(s));
  const [bMonth, bDay] = b.timestamp.numeric
    .split("/")
    .map((s) => Number.parseInt(s));

  if (aMonth - bMonth !== 0) return aMonth - bMonth;
  return aDay - bDay;
};
