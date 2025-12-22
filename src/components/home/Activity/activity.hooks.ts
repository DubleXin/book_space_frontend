import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getReviewsByUser, getStarredByUser } from "../../../api/profile";
import { useAuth } from "../../../store";

export const useStarEnriched = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["stars-enriched", user?.sub],
    queryFn: ({ signal }) => getStarredByUser(user!.sub, signal),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useReviewsEnriched = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["reviews-enriched", user?.sub],
    queryFn: ({ signal }) => getReviewsByUser(user!.sub, signal),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};
