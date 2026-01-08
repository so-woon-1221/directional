"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePostActions } from "../../posts/hooks/usePostActions";
import { PostCategory } from "../../posts/types/post.types";
import PostNew from "../components/PostNew";
import { usePostsNewActions } from "../hooks/usePostsNewActions";

interface Props {
  init?: {
    id: string;
    title: string;
    body: string;
    tags: string[];
    category: PostCategory;
  };
  isEditing?: boolean;
}

const FORBIDDEN_WORDS = ["캄보디아", "프놈펜", "불법체류", "텔레그램"] as const;

const forbiddenRegex = new RegExp(FORBIDDEN_WORDS.join("|"), "i");

const hasForbidden = (text: string): boolean => forbiddenRegex.test(text);

const PostNewController = ({ init, isEditing }: Props) => {
  const { mutateAsync: saveFn, isPending: isSavePending } =
    usePostsNewActions();
  const { useUpdatePost } = usePostActions();
  const { mutateAsync: updateFn, isPending: isUpdatePending } = useUpdatePost();
  const [value, setValue] = useState(init?.body || "");
  const [title, setTitle] = useState(init?.title || "");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>(init?.tags || []);
  const [category, setCategory] = useState<PostCategory>(
    init?.category || PostCategory.NOTICE,
  );
  const router = useRouter();

  const onSave = async () => {
    if (!title || !value) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    if (hasForbidden(title)) {
      alert("제목에 금지어가 포함되어 있습니다.");
      return;
    }
    if (hasForbidden(value)) {
      alert("내용에 금지어가 포함되어 있습니다.");
      return;
    }
    await saveFn({
      body: value,
      title: title,
      tags: tags,
      category: category,
    });
  };

  const onUpdate = async () => {
    if (hasForbidden(title)) {
      alert("제목에 금지어가 포함되어 있습니다.");
      return;
    }
    if (hasForbidden(value)) {
      alert("내용에 금지어가 포함되어 있습니다.");
      return;
    }
    await updateFn({
      id: init?.id || "",
      data: {
        body: value,
        title: title,
        tags: tags,
        category: category,
      },
    });
  };

  const onCancel = () => {
    router.push("/posts");
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">글 작성</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            취소
          </button>

          <button
            type="button"
            onClick={isEditing ? onUpdate : onSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={isEditing ? isSavePending : isUpdatePending}
          >
            {isEditing ? "수정" : "저장"}
          </button>
        </div>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as PostCategory)}
          className="w-[150px] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <option value={PostCategory.NOTICE}>공지</option>
          <option value={PostCategory.QNA}>Q&A</option>
          <option value={PostCategory.FREE}>자유</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="태그"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const isDuplicate = tags.includes(tag);
              if (!isDuplicate) {
                setTags([...tags, tag]);
              }
              setTag("");
            }
          }}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        />
        <div>
          {tags.map((tag, index) => (
            <span
              key={`tag-${tag}`}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>

      <PostNew value={value} setValue={setValue} />
    </div>
  );
};

export default PostNewController;
