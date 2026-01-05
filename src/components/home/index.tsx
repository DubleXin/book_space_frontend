import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../store";
import type { EnhancedRecommendationResponse } from "../../types/recommendation";

import GuestContent from "./GuestContent";
import Tags from "./Tags";
import RecommendationsAiContent from "./RecommendationsAiContent";
import RecommendationsAlgoContent from "./RecommendationsAlgoContent";

import { useAllBooks, useRecommendations } from "./home.hooks";
import { useSubjects } from "../../hooks/useSubjects";

import { useMyProfile } from "../../hooks";
import { useStars } from "../../hooks/useStars";
import { useReviews } from "../../hooks/useReviews";
import { getActivityList, sortBadges } from "./Activity/activity.utils";

import { cn } from "../../utils/cn";
import type { HomePanelState } from "./home.types";
import ActivityPanel from "./ActivityPanel";
import Shell from "./Shell";
import HomeContext from "./home.context";

const HomePage = () => {
  const { hash } = useLocation();

  const user = useAuth((s) => s.user);
  const [panel, setPanel] = useState<HomePanelState>("default");

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  const subjectsQuery = useSubjects();
  const recommendationQuery = useRecommendations();
  const bookQuery = useAllBooks({ limit: "20" }, "1");

  const subjects = subjectsQuery.data?.data ?? [];
  const books = bookQuery.data?.data ?? [];

  const EMPTY_RECS: EnhancedRecommendationResponse = {
    success: false,
    cachedAlgorithmic: false,
    data: { recommendedBooks: [], aiHighlights: [] },
  };

  const recommendationsResult = recommendationQuery.data;
  const recommendations =
    recommendationsResult && recommendationsResult.status === "ok"
      ? recommendationsResult.data
      : EMPTY_RECS;

  const profileQuery = useMyProfile();
  const starQuery = useStars();
  const reviewQuery = useReviews();

  const profile = profileQuery.data ?? undefined;
  const stars = useMemo(() => starQuery.data ?? [], [starQuery.data]);
  const reviews = useMemo(() => reviewQuery.data ?? [], [reviewQuery.data]);

  const activityItems = useMemo(() => {
    return getActivityList(profile, stars, reviews).sort(sortBadges).reverse();
  }, [profile, stars, reviews]);

  const activityPending =
    profileQuery.isPending || starQuery.isPending || reviewQuery.isPending;

  if (!recommendations.success) {
    if (!user) {
      return (
        <div className="w-screen flex p-8 gap-4 text-slate-950 dark:text-white">
          <main className="flex-[2] p-4">
            <div className="grid h-full grid-rows-[auto_1fr] gap-6">
              <Tags tags={subjects} />
              <GuestContent books={books} />
            </div>
          </main>
        </div>
      );
    }
    return <></>;
  }

  return (
    <HomeContext.Provider
      value={{
        state: panel,
        onStateChange: setPanel,
      }}
    >
      <Shell>
        <div className="flex w-full gap-6 min-w-0 relative">
          <main className="min-w-0">
            <div className="grid h-full grid-rows-[auto_auto_1fr] gap-6">
              <Tags tags={subjects} />
              <RecommendationsAiContent
                recommendations={recommendations.data}
              />
              <RecommendationsAlgoContent
                recommendations={recommendations.data}
              />
            </div>
          </main>

          <aside
            className={cn(
              "absolute left-0 top-0 z-50 overflow-hidden",
              "min-w-0",
              "transition-[max-width,opacity] duration-300 ease-in-out",
              panel === "activity"
                ? "max-w-[560px] opacity-100 pointer-events-auto w-full"
                : "max-w-0 opacity-0 pointer-events-none w-full"
            )}
          >
            <ActivityPanel
              username={profile?.username}
              items={activityItems}
              isPending={activityPending}
              variant={panel === "activity" ? "expanded" : "compact"}
              onExpand={() => setPanel("activity")}
              onCollapse={() => setPanel("default")}
            />
          </aside>
        </div>
      </Shell>
    </HomeContext.Provider>
  );
};

export default HomePage;
