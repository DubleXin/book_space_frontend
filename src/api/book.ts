import { callService } from "./client";
import type {
  BookListResponse,
  SubjectListResponse,
  BooksBySubjectResponse,
  BookResponse,
} from "../types/book";
import { SERVICES } from "./services";

export type QueryParams = Record<string, string>;

export async function fetchAllBooks(
  params?: QueryParams,
  signal?: AbortSignal
) {
  const res = await callService<BookListResponse>({
    method: "GET",
    url: "/api/book",
    baseURL: SERVICES.book,
    params,
    signal,
  });
  return res.data;
}

export async function fetchBook(id: number | string, signal?: AbortSignal) {
  const res = await callService<BookResponse>({
    method: "GET",
    url: `/api/book/${id}`,
    baseURL: SERVICES.book,
    signal,
  });
  console.log(res.data);

  return res.data;
}

export async function fetchAllSubjects(
  params?: QueryParams,
  signal?: AbortSignal
) {
  const res = await callService<SubjectListResponse>({
    method: "GET",
    url: "/api/subject",
    baseURL: SERVICES.book,
    params,
    signal,
  });
  return res.data;
}

export async function fetchBooksBySubject(
  id: number | string,
  params?: QueryParams,
  signal?: AbortSignal
) {
  const res = await callService<BooksBySubjectResponse>({
    method: "GET",
    url: `/api/subject/${id}`,
    baseURL: SERVICES.book,
    params,
    signal,
  });
  return res.data;
}
