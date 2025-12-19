import { fetchAllBooks, fetchAllSubjects } from "../api/book";
import { useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Tag } from "../components/ui/Tag";
import { BookCard } from "../components/ui/BookCard";
import { fetchEnhancedRecommendations } from "../api/recommendation";
import { useAuth } from "../store";

const parseTags = (tag: string): string => tag.replace("_", " ");

const HomePage = () => {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();

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
    queryKey: ["books-All:1"],
    queryFn: ({ signal }) => fetchAllBooks({ limit: "20" }, signal),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const subjects = subjectsQuery.data?.data ?? [];
  const recommendations = recommendationQuery.data?.data ?? {
    recommendedBooks: [],
    aiHighlights: [],
  };
  const books = bookQuery.data?.data ?? [];

  if (!user)
    return (
      <div
        className="
       w-screen 
      flex 
      p-8 gap-4"
      >
        {/*main content*/}
        <main
          className="
      flex-[2]
      p-4
      "
        >
          <div className="grid h-full grid-rows-[auto_1fr] gap-6">
            {/*tags*/}
            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-start gap-3 flex-wrap">
                {subjects.map((s) => (
                  <Tag variant="outline" key={`subject-tag-${s.name}`}>
                    {parseTags(s.name)}
                  </Tag>
                ))}
                <Tag onClick={() => navigate("/explore")}>more</Tag>
              </div>
            </div>

            <div className="min-h-0 rounded-xl border p-4 pb-12">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Featured Woks</h2>
              </div>

              {/* key: min-h-0 + overflow */}
              <div className="mt-3 min-h-0 overflow-auto">
                <ul className="space-y-3 flex gap-3 flex-wrap">
                  {books &&
                    books.map((s) => (
                      <BookCard
                        bookId={s.id}
                        key={`book-${s.id}`}
                        variant="tile"
                        coverSize="lg"
                        title={true}
                        to="/"
                        author={true}
                        coverUrl={true}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    );

  return (
    <div
      className="
       w-screen 
      flex 
      p-8 gap-4"
    >
      {/*main content*/}
      <main
        className="
      flex-[2]
      p-4
      "
      >
        <div className="grid h-full grid-rows-[auto_auto_1fr] gap-6">
          {/*tags*/}
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-start gap-3 flex-wrap">
              {subjects.map((s) => (
                <Tag variant="outline" key={`subject-tag-${s.name}`}>
                  {parseTags(s.name)}
                </Tag>
              ))}
              <Tag onClick={() => navigate("/explore")}>more</Tag>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="text-lg font-semibold">Selected works</h2>
            <ul className="mt-3 space-y-2 flex gap-3">
              {recommendations.aiHighlights &&
                recommendations.aiHighlights.map((s) => (
                  <BookCard
                    bookId={s.bookId}
                    key={`book-ai-${s.bookId}`}
                    variant="row"
                    coverSize="lg"
                    title={true}
                    subject={true}
                    coverUrl={true}
                    to="/"
                  />
                ))}
            </ul>
          </div>

          <div className="min-h-0 rounded-xl border p-4 pb-12">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Explore more</h2>
            </div>

            {/* key: min-h-0 + overflow */}
            <div className="mt-3 min-h-0 overflow-auto">
              <ul className="space-y-3 flex gap-3 flex-wrap">
                {recommendations.recommendedBooks &&
                  recommendations.recommendedBooks
                    .filter(
                      (value, i, array) =>
                        array.findIndex((s) => s.bookId === value.bookId) === i
                    )
                    .map((s) => (
                      <BookCard
                        bookId={s.bookId}
                        key={`book-${s.bookId}`}
                        variant="tile"
                        coverSize="lg"
                        title={true}
                        to="/"
                        author={true}
                        coverUrl={true}
                      />
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      {/*activity*/}
      <aside
        className="
      flex-[1] 
      border rounded-xl p-4"
      >
        Activity
      </aside>
    </div>
  );
};
export default HomePage;
