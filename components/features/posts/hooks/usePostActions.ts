import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deletePost, updatePost } from "../fetcher/posts.fetch";
import type { Post } from "../types/post.types";

export const usePostActions = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const useDeletePost = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        await deletePost(id);
      },
      mutationKey: ["posts", "delete"],
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["posts", "infinite"],
        });
        router.push("/posts");
      },
    });
  };

  const useUpdatePost = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: Partial<Post> }) => {
        await updatePost(id, data);
      },
      mutationKey: ["posts", "update"],
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["posts", "infinite"],
        });
        router.push("/posts");
      },
    });
  };

  return {
    useDeletePost,
    useUpdatePost,
  };
};
