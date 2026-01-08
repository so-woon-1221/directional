import type { PostCategory } from "../../posts/types/post.types";

export type CreatePostProps = {
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
};
