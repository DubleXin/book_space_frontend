import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchBook } from "../../api/book";
import { toggleStarRQ } from "../../api/profile";
import { useAuth } from "../../store";
import type { StarredBook } from "../../types/profile";

export const useBook = (bookId: number | null) =>
  useQuery({
    queryKey: ["book", bookId],
    queryFn: ({ signal }) => fetchBook(bookId!, signal),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: Number.isFinite(bookId),
  });

export const useToggleStar = () => {
  const user = useAuth((s) => s.user);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: toggleStarRQ,
    onMutate: async (bookId: number) => {
      if (!user) return;
      const key = ["stars", user.sub] as const;

      await qc.cancelQueries({ queryKey: key });

      const prev = qc.getQueryData<StarredBook[]>(key) ?? [];

      const isStared = prev.some((s) => s.bookId === bookId);
      const next = isStared
        ? prev.filter((s) => s.bookId !== bookId)
        : [
            ...prev,
            {
              id: -Date.now(),
              userId: user.sub,
              bookId: bookId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            } as StarredBook,
          ];
      qc.setQueryData<StarredBook[]>(key, next);

      return { prev, key };
    },

    onError: (_err, _bookId, ctx) => {
      if (!ctx) return;
      qc.setQueryData(ctx.key, ctx.prev);
    },

    onSettled: (_data, _err, _bookId, ctx) => {
      if (!ctx) return;
      qc.invalidateQueries({ queryKey: ctx.key });
    },
  });
};
