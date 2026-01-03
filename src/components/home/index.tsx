import { useAuth } from "../../store";
import type { EnhancedRecommendationResponse } from "../../types/recommendation";
import GuestContent from "./GuestContent";
import Tags from "./Tags";
import RecommendationsAiContent from "./RecommendationsAiContent";
import RecommendationsAlgoContent from "./RecommendationsAlgoContent";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Activity } from "./Activity";
import { useAllBooks, useRecommendations } from "./home.hooks";
import { useSubjects } from "../../hooks/useSubjects";

const HomePage = () => {
  const navigate = useNavigate();

  const user = useAuth((s) => s.user);
  const [guestContentVariant, setGuestContentVariant] = useState<
    "default" | "highlight"
  >("default");

  const EMPTY_RECS: EnhancedRecommendationResponse = {
    success: false,
    cachedAlgorithmic: false,
    data: {
      recommendedBooks: [],
      aiHighlights: [],
    },
  };

  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  const subjectsQuery = useSubjects();

  const recommendationQuery = useRecommendations();

  const bookQuery = useAllBooks(
    {
      limit: "20",
    },
    "1"
  );

  const subjects = subjectsQuery.data?.data ?? [];

  const recommendationsResult = recommendationQuery.data;

  const recommendations =
    recommendationsResult && recommendationsResult.status === "ok"
      ? recommendationsResult.data
      : EMPTY_RECS;

  const books = bookQuery.data?.data ?? [];

  if (!user)
    return (
      <div
        className="
       w-screen 
      flex 
      p-8 gap-4 text-slate-950 dark:text-white"
      >
        <main className="flex-[2] p-4">
          <div className="grid h-full grid-rows-[auto_1fr] gap-6">
            <Tags tags={subjects} />
            <GuestContent books={books} />
          </div>
        </main>
      </div>
    );

  if (!recommendations.success) {
    function onFeaturedButtonClick(): void {
      setGuestContentVariant("highlight");
      navigate("#featured");
      setTimeout(() => {
        setGuestContentVariant("default");
        navigate("/");
      }, 500);
    }

    return (
      <div
        className="w-screen flex 
                p-8 gap-4 text-slate-950 dark:text-white"
      >
        <main
          className="
      flex-[2]
      p-4
      "
        >
          <div className="grid h-full grid-rows-[auto_1fr] gap-6">
            <Tags tags={subjects} />
            <div className="min-h-0 rounded-xl border p-4 pb-12">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  Tell us more about your tastes
                </h2>
              </div>
              <div className="mt-3 min-h-0 overflow-auto">
                <ul className=" flex flex-wrap gap-3 items-center">
                  <li className="p-2">
                    <Button onClick={() => navigate("/explore")}>
                      Explore Catalog
                    </Button>
                  </li>
                  <li className="p-1">
                    <Button onClick={onFeaturedButtonClick} variant="secondary">
                      Look for Featured Works
                    </Button>
                  </li>
                </ul>
              </div>
            </div>

            <GuestContent
              id="featured"
              variant={guestContentVariant}
              books={books}
            />
          </div>
        </main>

        <aside className="flex-[1]">
          <Activity />
        </aside>
      </div>
    );
  }

  return (
    <div
      className="w-screen flex 
                p-8 gap-4 text-slate-950 dark:text-white"
    >
      <main className=" flex-[2] p-4">
        <div className="grid h-full grid-rows-[auto_auto_1fr] gap-6">
          <Tags tags={subjects} />
          <RecommendationsAiContent recommendations={recommendations.data} />
          <RecommendationsAlgoContent recommendations={recommendations.data} />
        </div>
      </main>
      <aside className="flex-[1] ">
        <Activity />
      </aside>
    </div>
  );
};
export default HomePage;
