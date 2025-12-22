import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllBooks, fetchAllSubjects } from "../../api/book";
import { fetchEnhancedRecommendations } from "../../api/recommendation";
import { useAuth } from "../../store";

export const useSubjects = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: ({ signal }) => fetchAllSubjects(undefined, signal),
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

export const useRecommendations = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["recommendations", user?.sub],
    queryFn: ({ signal }) => fetchEnhancedRecommendations(signal),
    staleTime: 20 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useBooks = (
  options = { limit: "20" },
  cacheKeyIndex: string = "1"
) => {
  return useQuery({
    queryKey: [`books-all:${cacheKeyIndex}`],
    queryFn: ({ signal }) => fetchAllBooks(options, signal),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
