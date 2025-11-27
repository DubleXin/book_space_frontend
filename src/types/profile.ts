import type { Book } from "./book";

export interface Profile {
  id: number;
  userId: number;
  username: string;
  bio?: string | null;
  createdAt?: string;
  updatedAt?: string;
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

export interface StarredBook {
  id: number;
  userId: number;
  bookId: number;
  createdAt?: string;
  updatedAt?: string;

  book?: Book;
}
