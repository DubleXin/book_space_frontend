import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMyStarred } from "../api/profile";
import { useAuth } from "../store";

const useMyStars = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["stars", user?.sub],
    queryFn: ({ signal }) => getMyStarred(signal),
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export default useMyStars;
