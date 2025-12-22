import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuth } from "../store";
import { getMyProfile } from "../api/profile";

const useMyProfile = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["profile", user?.sub],
    queryFn: ({ signal }) => getMyProfile(signal),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export default useMyProfile;
