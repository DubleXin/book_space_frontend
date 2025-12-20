import {
  type Profile,
  type ProfileResponse,
  type ReviewResponse,
  type ReviewListResponse,
  type StarredResponse,
  type StarredListResponse,
} from "../types/profile";
import { callService } from "./client";
import { SERVICES } from "./services";

export async function getMyProfile(signal?: AbortSignal) {
  const res = await callService<ProfileResponse>({
    method: "GET",
    url: "/api/profile/me",
    baseURL: SERVICES.profile,
    signal,
  });
  return res.data.data;
}

export async function updateMyProfile(
  payload: Partial<Profile>,
  signal?: AbortSignal
) {
  const res = await callService<ProfileResponse>({
    method: "PUT",
    url: "/api/profile/me",
    baseURL: SERVICES.profile,
    data: payload,
    signal,
  });
  return res.data.data;
}

export async function createReview(
  payload: {
    bookId: number;
    message: string;
    rating?: number;
  },
  signal?: AbortSignal
) {
  const res = await callService<ReviewResponse>({
    method: "POST",
    url: "/api/review",
    baseURL: SERVICES.profile,
    data: payload,
    signal,
  });
  return res.data.data;
}

export async function getMyReviews(signal?: AbortSignal) {
  const res = await callService<ReviewListResponse>({
    method: "GET",
    url: "/api/review/me",
    baseURL: SERVICES.profile,
    signal,
  });
  return res.data.data;
}

export async function getReviewsByBook(bookId: number, signal?: AbortSignal) {
  const res = await callService<ReviewListResponse>({
    method: "GET",
    url: `/api/review/book/${bookId}`,
    baseURL: SERVICES.profile,
    signal,
  });
  return res.data.data;
}

export async function getReviewsByUser(userId: number, signal?: AbortSignal) {
  const res = await callService<ReviewListResponse>({
    method: "GET",
    url: `/api/review/${userId}`,
    baseURL: SERVICES.profile,
    signal,
  });
  return res.data.data;
}

export async function toggleStar(bookId: number, signal?: AbortSignal) {
  const res = await callService<StarredResponse>({
    method: "POST",
    url: "/api/star",
    baseURL: SERVICES.profile,
    data: { bookId },
    signal,
  });
  return res.data;
}

export async function getMyStarred(signal?: AbortSignal) {
  const res = await callService<StarredListResponse>({
    method: "GET",
    url: "/api/star/me",
    baseURL: SERVICES.profile,
    signal,
  });
  return res.data.data;
}

export async function getStarredByUser(userId: number, signal?: AbortSignal) {
  const res = await callService<StarredListResponse>({
    method: "GET",
    url: `/api/star/${userId}`,
    baseURL: SERVICES.profile,
    signal,
  });
  return res.data.data;
}
