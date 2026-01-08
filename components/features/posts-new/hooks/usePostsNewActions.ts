import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createPost } from "../fetcher/posts.new.fetch";
import type { CreatePostProps } from "../types/post.new.types";

export const usePostsNewActions = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: CreatePostProps) => {
      const response = await createPost(props);

      return response;
    },
    mutationKey: ["posts", "new"],
    onSuccess: () => {
      router.push("/posts");
      queryClient.invalidateQueries({
        queryKey: ["posts", "infinite"],
      });
    },
  });
};
