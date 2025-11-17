import api from "./client";
import type {
  BookListResponse,
  SubjectListResponse,
  BooksBySubjectResponse,
  Book,
} from "../types/book";

export type QueryParams = Record<string, string>;

export async function fetchAllBooks(params?: QueryParams) {
  const res = await api.get<BookListResponse>("/book", { params });
  return res.data;
}

export async function fetchBook(id: number | string) {
  const res = await api.get<Book>(`/book/${id}`);
  return res.data;
}

export async function fetchAllSubjects(params?: QueryParams) {
  const res = await api.get<SubjectListResponse>("/subject", { params });
  return res.data;
}

export async function fetchBooksBySubject(
  id: number | string,
  params?: QueryParams
) {
  const res = await api.get<BooksBySubjectResponse>(`/subject/${id}`, {
    params,
  });
  return res.data;
}
