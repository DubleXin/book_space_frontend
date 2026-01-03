import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllBooks } from "../api/book";

export const useBooks = (options = {}, cacheKey: string[]) => {
  return useQuery({
    queryKey: [`books`, ...cacheKey],
    queryFn: ({ signal }) => fetchAllBooks(options, signal),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
