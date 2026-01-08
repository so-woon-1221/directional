import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../fetcher/posts.fetch";
import type { PostQueryParams } from "../types/post.types";

export const usePostQuery = (params?: PostQueryParams) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: async () => {
      const response = await fetchPosts(params);
      return response;
    },
  });
};

type InfinitePostQueryParams = {
  cursor: string | undefined;
  direction: "next" | "prev";
};

export const useInfinitePostQuery = (params?: PostQueryParams) => {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite", params],
    queryFn: async ({ pageParam }) => {
      const { cursor, direction } = pageParam;

      const isNext = direction === "next";
      const response = await fetchPosts({
        ...params,
        nextCursor: isNext ? cursor : undefined,
        prevCursor: !isNext ? cursor : undefined,
      });
      return response;
    },
    initialPageParam: {
      cursor: undefined,
      direction: "next" as const,
    } as InfinitePostQueryParams,
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextCursor) return undefined;
      return {
        cursor: lastPage.nextCursor,
        direction: "next" as const,
      };
    },
    getPreviousPageParam: (firstPage) => {
      if (!firstPage.prevCursor) return undefined;
      return {
        cursor: firstPage.prevCursor,
        direction: "prev" as const,
      };
    },
  });
};
