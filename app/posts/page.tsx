import { Suspense } from "react";
import PostsLoader from "@/components/features/posts/container/PostsLoader";

const Page = () => {
  return (
    <div className="w-full p-4 h-[calc(100vh-4rem)] flex">
      <Suspense fallback={null}>
        <PostsLoader />
      </Suspense>
    </div>
  );
};

export default Page;
