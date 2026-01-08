import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { POST_COLUMNS } from "../constants/columns";
import type { Post } from "../types/post.types";

interface Props {
  data: Post[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

const PostsView = ({
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: Props) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element || !hasNextPage || !fetchNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const [columnSizing, setColumnSizing] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const parentRef = useRef(null);

  const columns = POST_COLUMNS;

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnSizing,
      columnVisibility,
    },
    onColumnSizingChange: setColumnSizing,
    onColumnVisibilityChange: setColumnVisibility,
    enableColumnResizing: true,
    enableHiding: true,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-2 flex justify-end relative">
        <button
          type="button"
          onClick={() => setShowColumnMenu(!showColumnMenu)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
        >
          컬럼 표시/숨김 ▼
        </button>

        {showColumnMenu && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-20 min-w-[200px]">
            <div className="p-2 border-b border-gray-200 font-bold text-sm">
              표시할 컬럼 선택
            </div>
            <div className="p-2 max-h-64 overflow-auto">
              {table.getAllLeafColumns().map((column) => {
                return (
                  <label
                    key={column.id}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="cursor-pointer"
                    />
                    <span className="text-sm">
                      {typeof column.columnDef.header === "string"
                        ? column.columnDef.header
                        : column.id}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="p-2 border-t border-gray-200 flex gap-2">
              <button
                type="button"
                onClick={() => table.toggleAllColumnsVisible(true)}
                className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                모두 표시
              </button>
              <button
                type="button"
                onClick={() => setShowColumnMenu(false)}
                className="flex-1 px-2 py-1 bg-gray-200 rounded text-xs hover:bg-gray-300"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
      <div ref={parentRef} className="flex-1 border-x border-gray-300 rounded">
        <div style={{ width: table.getTotalSize(), minWidth: "100%" }}>
          {/* 헤더 */}
          <div className="sticky top-0 z-10 bg-white border-t border-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <div key={headerGroup.id} className="flex">
                {headerGroup.headers.map((header) => {
                  const isResizing = header.column.getIsResizing();

                  return (
                    <div
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-bold relative border-r border-gray-600"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      <button
                        type="button"
                        onMouseDown={(e) => {
                          header.getResizeHandler()(e);
                        }}
                        onTouchStart={header.getResizeHandler()}
                        className={`absolute right-0 top-0 w-1 h-full cursor-col-resize ${
                          isResizing
                            ? "bg-red-500 w-2"
                            : "bg-blue-500 hover:bg-blue-400 hover:w-2"
                        }`}
                        style={{
                          userSelect: "none",
                          touchAction: "none",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* 바디 (가상화) */}
          <div
            style={{
              height: `${totalSize}px`,
              position: "relative",
            }}
          >
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              const isEven = virtualRow.index % 2 === 0;

              return (
                <div
                  key={row.id}
                  className={`absolute top-0 left-0 w-full border-b border-gray-200 flex ${
                    isEven ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <Link href={`/posts/${row.original.id}`} className="flex">
                    {row.getVisibleCells().map((cell) => (
                      <div
                        key={cell.id}
                        className="px-4 py-3 text-sm overflow-hidden text-ellipsis whitespace-nowrap border-r border-gray-200"
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    ))}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {hasNextPage && <div className="h-4 invisible" ref={loadMoreRef}></div>}
      </div>
    </div>
  );
};

export default PostsView;
