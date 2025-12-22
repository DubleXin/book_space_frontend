import type { Profile, Review, StarredBook } from "../../../types/profile";
import { toMonDD } from "../../../utils/date";
import type { activityBadgeData } from "./activity.types";

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

export const getActivityList = (
  profile?: Profile,
  stars?: StarredBook[],
  reviews?: Review[]
): activityBadgeData[] => {
  if (!profile || !stars || !reviews) return [];
  const result: activityBadgeData[] = [];

  const { createdAt: profileCreated, updatedAt: profileUpdated } = profile;

  if (profileUpdated)
    result.push({
      source: { name: "profile", to: "/me" },
      timestamp: toMonDD(profileUpdated),
      action: "updated",
    });

  if (profileCreated)
    result.push({
      source: { name: "profile", to: "/me" },
      timestamp: toMonDD(profileCreated),
      action: "created",
    });

  stars.forEach((s) =>
    s.createdAt
      ? result.push({
          source: { name: `${s.book?.title}`, to: `/book/${s.bookId}` },
          timestamp: toMonDD(s.createdAt),
          action: "starred",
        })
      : null
  );

  reviews.forEach((r) =>
    r.createdAt
      ? result.push({
          source: { name: `${r.book?.title}`, to: `/book/${r.bookId}` },
          timestamp: toMonDD(r.createdAt),
          action: "reviewed",
        })
      : null
  );
  return result;
};
