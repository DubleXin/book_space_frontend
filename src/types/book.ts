export interface Book {
  id: number;
  title: string;
  author?: string | undefined;
  isbn?: string | undefined;
  publishedYear?: number | undefined;
  coverUrl?: string | undefined;
  description?: string | undefined;
  externalSource?: string | undefined;
  externalId?: number | undefined;

  subjects?: Subject[];

  createdAt?: string;
  updatedAt?: string;
}

export interface BookResponse {
  success: boolean;
  data: Book;
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
