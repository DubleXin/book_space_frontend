import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuth } from "../store";
import { getMyProfile } from "../api/profile";

const useMyProfile = (staleTime: number = 60 * 1000) => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["profile", user?.sub],
    queryFn: ({ signal }) => getMyProfile(signal),
    staleTime: staleTime,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export default useMyProfile;
