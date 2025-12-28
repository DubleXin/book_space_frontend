import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createReviewRQ,
  getProfileByUserId,
  getReviewsByBookId,
} from "../../../api/profile";
import { useAuth } from "../../../store";
import type { Review } from "../../../types/profile";

export const useProfileByUserId = (userId?: number | null) =>
  useQuery({
    queryKey: ["profile", userId],
    queryFn: ({ signal }) => getProfileByUserId(userId!, signal),
    placeholderData: keepPreviousData,
    staleTime: 60 * 60 * 1000,
    enabled: Number.isFinite(userId),
  });

export const useReviewsByBook = (bookId: number | null) =>
  useQuery({
    queryFn: ({ signal }) => getReviewsByBookId(bookId!, signal),
    queryKey: ["reviews-book", bookId],
    placeholderData: keepPreviousData,
    enabled: Number.isFinite(bookId),
  });

export const useCreateReview = () => {
  const user = useAuth((s) => s.user);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createReviewRQ,

    onMutate: async (vars: {
      bookId: number;
      message: string;
      rating?: number;
    }) => {
      const key = ["reviews-book", vars.bookId] as const;

      await qc.cancelQueries({ queryKey: key });

      const prev = qc.getQueryData<Review[]>(key);

      if (!user) return { prev, key };

      const tempReview: Review = {
        id: -Date.now(),
        userId: user.sub,
        bookId: vars.bookId,
        message: vars.message,
        rating: vars.rating ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      qc.setQueryData<Review[]>(key, (old) => {
        const items = old ?? [];
        return [tempReview, ...items];
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
