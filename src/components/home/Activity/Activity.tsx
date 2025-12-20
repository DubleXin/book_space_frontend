import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../store";
import {
  getMyProfile,
  getReviewsByUser,
  getStarredByUser,
} from "../../../api/profile";
import type { Profile, Review, StarredBook } from "../../../types/profile";
import type { activityBadgeData } from "./activity.types";
import { sortBadges, toMonDD } from "./activity.utils";
import { Link } from "react-router-dom";

const getActivityList = (
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
          source: { name: `${s.book?.title}` },
          timestamp: toMonDD(s.createdAt),
          action: "starred",
        })
      : null
  );

  reviews.forEach((r) =>
    r.createdAt
      ? result.push({
          source: { name: `${r.book?.title}` },
          timestamp: toMonDD(r.createdAt),
          action: "reviewed",
        })
      : null
  );
  return result;
};

const Activity = () => {
  const user = useAuth((s) => s.user);

  const profileQuery = useQuery({
    queryKey: ["profile", user?.sub],
    queryFn: ({ signal }) => getMyProfile(signal),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });

  const starQuery = useQuery({
    queryKey: ["stars-enriched", user?.sub],
    queryFn: ({ signal }) => getStarredByUser(user!.sub, signal),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });

  const reviewQuery = useQuery({
    queryKey: ["reviews-enriched", user?.sub],
    queryFn: ({ signal }) => getReviewsByUser(user!.sub, signal),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });

  const profile = profileQuery.data ?? undefined;
  const stars = starQuery.data ?? undefined;
  const reviews = reviewQuery.data ?? undefined;

  if (!user) return <></>;
  return (
    <div
      className="p-4
      border rounded-xl"
    >
      <h3>
        Recent Actions
        {profile && (
          <span className="ml-2 text-sky-500">
            {`[`}
            {profile.username}
            {`]`}
          </span>
        )}
      </h3>
      <ul className="mt-4">
        {getActivityList(profile, stars, reviews)
          .sort(sortBadges)
          .reverse()
          .slice(0, 30)
          .map((a, i) => (
            <li key={`activity-item-${i}`}>
              <span className="text-sky-500">{`>`}</span>{" "}
              <span>
                {a.source.to ? (
                  <Link
                    className="underline hover:decoration-sky-500 transition"
                    to={a.source.to}
                  >
                    {a.source.name}
                  </Link>
                ) : (
                  a.source.name
                )}
              </span>{" "}
              - <span>{a.timestamp.formatted}</span> - <span>{a.action}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Activity;
