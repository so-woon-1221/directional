import { notFound } from "next/navigation";
import { fetchPost } from "@/components/features/posts/fetcher/posts.fetch";
import PostNewController from "@/components/features/posts-new/container/PostNewController";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  let post: Awaited<ReturnType<typeof fetchPost>>;
  try {
    post = await fetchPost(id);
  } catch {
    notFound();
  }

  return (
    <PostNewController
      init={{
        id: id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        category: post.category,
      }}
      isEditing
    />
  );
};

export default Page;
