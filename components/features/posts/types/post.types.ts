export enum PostCategory {
  NOTICE = "NOTICE",
  QNA = "QNA",
  FREE = "FREE",
}

export type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
  createdAt: string;
};

export enum PostSort {
  createdAt = "createdAt",
  title = "title",
}

export enum PostOrder {
  asc = "asc",
  desc = "desc",
}

export type PostQueryParams = {
  prevCursor?: string;
  nextCursor?: string;
  sort?: PostSort;
  order?: PostOrder;
  category?: PostCategory;
  from?: string;
  to?: string;
  search?: string;
};
