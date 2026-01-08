import { notFound } from "next/navigation";
import PostDetailView from "@/components/features/posts/components/PostDetailView";
import { fetchPost } from "@/components/features/posts/fetcher/posts.fetch";

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

  return <PostDetailView post={post} />;
};

export default Page;
