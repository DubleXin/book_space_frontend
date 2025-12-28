import type { Book } from "./book";

export interface Profile {
  id: number;
  userId: number;
  username: string;
  bio?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileResponse {
  success: boolean;
  data: Profile;
}

export interface Review {
  id: number;
  userId: number;
  bookId: number;
  message: string;
  rating?: number | null;
  createdAt?: string;
  updatedAt?: string;

  book?: Book;
}

export interface ReviewListResponse {
  success: boolean;
  data: Review[];
}

export interface ReviewResponse {
  success: boolean;
  data: Review;
}

export interface ReviewEmptyResponse {
  success: boolean;
  message: string;
}

export interface StarredBook {
  id: number;
  userId: number;
  bookId: number;
  createdAt?: string;
  updatedAt?: string;

  book?: Book;
}

export interface StarredListResponse {
  success: boolean;
  data: StarredBook[];
}

export interface StarredResponse {
  success: boolean;
  data?: StarredBook;
}
