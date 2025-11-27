export interface Book {
  id: number;
  title: string;
  author?: string | null;
  isbn?: string | null;
  publishedYear?: number | null;
  coverUrl?: string | null;
  description?: string | null;
  externalSource?: string | null;
  externalId?: number | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface Subject {
  id: number;
  name: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface BookListResponse {
  success: boolean;
  count: number;
  data: Book[];
}

export interface BooksBySubjectResponse {
  success: boolean;
  data: {
    subject: string;
    books: Book[];
    pagination: {
      limit: number;
      offset: number;
      count: number;
    };
  };
}

export interface SubjectListResponse {
  success: boolean;
  data: Subject[];
}
