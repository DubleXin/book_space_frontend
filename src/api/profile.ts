import api from "./client";
import { type Profile, type Review, type StarredBook } from "../types/profile";

export async function getMyProfile() {
  const res = await api.get<{ success: boolean; data: Profile }>("/profile/me");
  return res.data.data;
}

export async function updateMyProfile(payload: Partial<Profile>) {
  const res = await api.put<{ success: boolean; data: Profile }>(
    "/profile/me",
    payload
  );
  return res.data.data;
}

export async function createReview(payload: {
  bookId: number;
  message: string;
  rating?: number;
}) {
  const res = await api.post<{ success: boolean; data: Review }>(
    "/review",
    payload
  );
  return res.data.data;
}

export async function getMyReviews() {
  const res = await api.get<{ success: boolean; data: Review[] }>("/review/me");
  return res.data.data;
}

export async function getReviewsByBook(bookId: number) {
  const res = await api.get<{ success: boolean; data: Review[] }>(
    `/review/book/${bookId}`
  );
  return res.data.data;
}

export async function getReviewsByUser(userId: number) {
  const res = await api.get<{ success: boolean; data: Review[] }>(
    `/review/${userId}`
  );
  return res.data.data;
}

export async function toggleStar(bookId: number) {
  const res = await api.post<{ success: boolean; data?: StarredBook }>(
    "/star",
    { bookId }
  );
  return res.data;
}

export async function getMyStarred() {
  const res = await api.get<{ success: boolean; data: StarredBook[] }>(
    "/star/me"
  );
  return res.data.data;
}

export async function getStarredByUser(userId: number) {
  const res = await api.get<{ success: boolean; data: StarredBook[] }>(
    `/star/${userId}`
  );
  return res.data.data;
}
