import { unwrapResultForQuery } from "@/utils/error";
import { serverFetch } from "@/utils/serverFetch";
import type { Post } from "../../posts/types/post.types";
import type { CreatePostProps } from "../types/post.new.types";

export const createPost = async (props: CreatePostProps) => {
  const response = await serverFetch<Post>("/posts", {
    method: "POST",
    body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return unwrapResultForQuery(response);
};
