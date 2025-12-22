import { useAuth } from "../../../store";
import { getActivityList, sortBadges } from "./activity.utils";
import { Link } from "react-router-dom";
import { useReviewsEnriched, useStarEnriched } from "./activity.hooks";
import { useMyProfile } from "../../../hooks";

const Activity = () => {
  const user = useAuth((s) => s.user);

  const profileQuery = useMyProfile();
  const starQuery = useStarEnriched();
  const reviewQuery = useReviewsEnriched();

  const profile = profileQuery.data ?? undefined;
  const stars = starQuery.data ?? [];
  const reviews = reviewQuery.data ?? [];

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
