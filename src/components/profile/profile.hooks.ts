import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "../../store";
import {
  deleteReviewByIdRQ,
  getMyReviews,
  updateMyProfileRQ,
} from "../../api/profile";
import type { Profile, Review } from "../../types/profile";

export const useMyReviews = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["reviews", user?.sub],
    queryFn: ({ signal }) => getMyReviews(signal),
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useMutateProfile = () => {
  const user = useAuth((s) => s.user);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfileRQ,

    onMutate: async (vars: Partial<Profile>) => {
      if (!user) return;

      const key = ["profile", user.sub] as const;

      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Profile>(key);

      qc.setQueryData<Profile>(key, (old) => {
        const base: Profile =
          old ??
          ({
            id: 0,
            userId: user.sub,
            username: `user_${user.sub}`,
            bio: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Profile);

        return {
          ...base,
          ...(vars.username !== undefined ? { username: vars.username } : null),
          ...(vars.bio !== undefined ? { bio: vars.bio } : null),
          updatedAt: new Date().toISOString(),
        };
      });

      return { prev, key };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      qc.setQueryData(ctx.key, ctx.prev);
    },

    onSettled: (_data, _err, _vars, ctx) => {
      if (!ctx) return;
      qc.invalidateQueries({ queryKey: ctx.key });
    },
  });
};

export const useDeleteReview = () => {
  const user = useAuth((s) => s.user);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteReviewByIdRQ,
    onMutate: async (reviewId: number) => {
      const key = ["reviews-enriched", user?.sub] as const;

      await qc.cancelQueries({ queryKey: key });

      const prev = qc.getQueryData<Review[]>(key) ?? [];

      if (!user) return { prev, key };

      qc.setQueryData<Review[]>(key, (old) => {
        const items = old ?? [];
        return items.filter((v) => v.id !== reviewId);
      });

      return { prev, key };
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      qc.setQueryData(ctx.key, ctx.prev);
    },

    onSettled: (_data, _err, _vars, ctx) => {
      if (!ctx) return;
      qc.invalidateQueries({ queryKey: ctx.key });
    },
  });
};
