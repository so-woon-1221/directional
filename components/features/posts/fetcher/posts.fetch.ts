"use server";

import { unwrapResultForQuery } from "@/utils/error";
import { serverFetch } from "@/utils/serverFetch";
import type { Post, PostQueryParams } from "../types/post.types";

export const fetchPosts = async (params?: PostQueryParams) => {
  const searchParams = new URLSearchParams();

  if (params?.prevCursor) searchParams.set("prevCursor", params.prevCursor);
  if (params?.nextCursor) searchParams.set("nextCursor", params.nextCursor);
  if (params?.sort) searchParams.set("sort", params.sort);
  if (params?.order) searchParams.set("order", params.order);
  if (params?.category) searchParams.set("category", params.category);
  if (params?.from) searchParams.set("from", params.from);
  if (params?.to) searchParams.set("to", params.to);
  if (params?.search) searchParams.set("search", params.search);

  searchParams.set("limit", "5");

  const url = `/posts?${searchParams.toString()}`;
  const response = await serverFetch<{
    items: Post[];
    nextCursor: string | null;
    prevCursor: string | null;
  }>(url);

  return unwrapResultForQuery(response);
};

export const fetchPost = async (id: string) => {
  const response = await serverFetch<Post>(`/posts/${id}`);
  return unwrapResultForQuery(response);
};

export const deletePost = async (id: string) => {
  const response = await serverFetch<void>(`/posts/${id}`, {
    method: "DELETE",
  });
  return unwrapResultForQuery(response);
};

export const updatePost = async (id: string, data: Partial<Post>) => {
  const response = await serverFetch<Post>(`/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return unwrapResultForQuery(response);
};
