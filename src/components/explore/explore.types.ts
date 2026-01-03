export type Filters = {
  search: string;
  author: string;
  subject: string[];
  limit: number;
  offset: number;
};

export type BooksApiParams = Omit<Filters, "subject"> & {
  subject?: string;
};
