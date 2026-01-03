import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllSubjects } from "../api/book";

export const useSubjects = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: ({ signal }) => fetchAllSubjects(undefined, signal),
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
