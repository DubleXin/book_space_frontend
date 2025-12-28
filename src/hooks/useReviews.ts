import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuth } from "../store";
import { getReviewsByUserId } from "../api/profile";

export const useReviews = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["reviews-enriched", user?.sub],
    queryFn: ({ signal }) => getReviewsByUserId(user!.sub, signal),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};
