import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import removeMd from "remove-markdown";
import type { Post } from "../types/post.types";

export const POST_COLUMNS: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "제목",
    size: 240,
    minSize: 120,
    maxSize: 480,
  },
  {
    accessorKey: "body",
    header: "본문",
    size: 400,
    minSize: 200,
    maxSize: 800,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const plainText = removeMd(value);
      return plainText.length > 100
        ? `${plainText.slice(0, 100)}...`
        : plainText;
    },
  },
  {
    accessorKey: "userId",
    header: "작성자 아이디",
    size: 140,
    minSize: 100,
    maxSize: 200,
  },
  {
    accessorKey: "category",
    header: "카테고리",
    size: 120,
    minSize: 100,
    maxSize: 200,
  },
  {
    accessorKey: "tags",
    header: "태그",
    size: 200,
    minSize: 100,
    maxSize: 400,
    cell: ({ getValue }) => {
      const tags = getValue() as string[];
      return tags.join(", ");
    },
  },
  {
    accessorKey: "createdAt",
    header: "작성일",
    size: 180,
    minSize: 100,
    maxSize: 200,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return dayjs(value).format("YYYY-MM-DD HH:mm");
    },
  },
];
