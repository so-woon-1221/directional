"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ErrorState from "../components/ErrorState";
import LoadingMore from "../components/LoadingMore";
import LoadingState from "../components/LoadingState";
import PostsView from "../components/PostsView";
import { useInfinitePostQuery } from "../hooks/usePostQuery";
import { PostCategory, type PostOrder, PostSort } from "../types/post.types";

const PostsLoader = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [tempKeyword, setTempKeyword] = useState(keyword);
  const filter = (searchParams.get("filter") || "") as PostCategory;
  const sort = (searchParams.get("sort") || "") as PostSort;
  const order = (searchParams.get("order") || "desc") as PostOrder;

  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePostQuery({
    category: filter,
    order,
    sort,
    search: keyword,
  });

  const flatData = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">전체 글: {flatData.length}</div>
        <div className="flex gap-2">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer text-sm"
            href="/posts/new"
          >
            작성
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={filter}
          onChange={(e) => {
            const newFilter = e.target.value as PostCategory;
            const newParams = new URLSearchParams(searchParams);
            newParams.set("filter", newFilter);
            router.push(`/posts?${newParams.toString()}`);
          }}
        >
          <option value="">전체</option>
          <option value={PostCategory.FREE}>자유게시판</option>
          <option value={PostCategory.NOTICE}>공지사항</option>
          <option value={PostCategory.QNA}>Q&A</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={tempKeyword}
          onChange={(e) => {
            const newKeyword = e.target.value;
            setTempKeyword(newKeyword);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("keyword", tempKeyword);
              router.push(`/posts?${newParams.toString()}`);
            }
          }}
        />
        <select
          value={sort}
          onChange={(e) => {
            const newSort = e.target.value as PostSort;
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sort", newSort);
            router.push(`/posts?${newParams.toString()}`);
          }}
        >
          <option value="">정렬</option>
          <option value={PostSort.title}>제목순</option>
          <option value={PostSort.createdAt}>작성일순</option>
        </select>
        <select
          value={order}
          onChange={(e) => {
            const newSortOrder = e.target.value as "asc" | "desc";
            const newParams = new URLSearchParams(searchParams);
            newParams.set("order", newSortOrder);
            router.push(`/posts?${newParams.toString()}`);
          }}
        >
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>
      <div className="overflow-auto flex-1 flex flex-col">
        <PostsView
          data={flatData}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        {isFetchingNextPage && <LoadingMore />}
      </div>
    </div>
  );
};

export default PostsLoader;
