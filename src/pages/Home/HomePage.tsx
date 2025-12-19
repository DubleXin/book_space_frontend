import { fetchAllBooks, fetchAllSubjects } from "../../api/book";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchEnhancedRecommendations } from "../../api/recommendation";
import { useAuth } from "../../store";
import type { EnhancedRecommendationResponse } from "../../types/recommendation";
import GuestContent from "./GuestContent";
import Tags from "./Tags";
import RecommendationsAiContent from "./RecommendationsAiContent";
import RecommendationsAlgoContent from "./RecommendationsAlgoContent";
import { Button } from "../../components/ui/Button";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

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

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: ({ signal }) => fetchAllSubjects(undefined, signal),
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const recommendationQuery = useQuery({
    queryKey: ["recommendations", user?.sub],
    queryFn: ({ signal }) => fetchEnhancedRecommendations(signal),
    staleTime: 20 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });

  const bookQuery = useQuery({
    queryKey: ["books-all:1"],
    queryFn: ({ signal }) => fetchAllBooks({ limit: "20" }, signal),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

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

        <aside
          className="flex-[1] p-4
      border rounded-xl "
        >
          <h3>Recent Actions</h3>
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
      <aside
        className="flex-[1] p-4
      border rounded-xl "
      >
        <h3>Recent Actions</h3>
      </aside>
    </div>
  );
};
export default HomePage;
