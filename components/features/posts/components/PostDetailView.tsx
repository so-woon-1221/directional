"use client";

import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePostActions } from "../hooks/usePostActions";
import type { Post } from "../types/post.types";

interface Props {
  post: Post;
}

const PostDetailView = ({ post }: Props) => {
  const { useDeletePost } = usePostActions();
  const { mutateAsync: deletePost, isPending: isDeletePending } =
    useDeletePost();

  const handleDeletePost = async () => {
    await deletePost(post.id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 border-b pb-4">
          <span>작성자: {post.userId}</span>
          <span>·</span>
          <span>{dayjs(post.createdAt).format("YYYY년 MM월 DD일 HH:mm")}</span>
          <span>·</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
            {post.category}
          </span>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mb-6 flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="max-w-none" data-color-mode="light">
        <MDEditor.Markdown source={post.body} />
      </div>

      <div className="mt-12 pt-6 border-t">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft />
          목록으로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Link
          href={`/posts/${post.id}/edit`}
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-center"
        >
          수정하기
        </Link>
        <button
          type="button"
          onClick={handleDeletePost}
          disabled={isDeletePending}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default PostDetailView;
