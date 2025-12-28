import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getStarredByUser } from "../api/profile";
import { useAuth } from "../store";

export const useStars = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["stars-enriched", user?.sub],
    queryFn: ({ signal }) => getStarredByUser(user!.sub, signal),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};
