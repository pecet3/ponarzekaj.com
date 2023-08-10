"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BsCaretRightSquareFill, BsCaretLeftSquareFill } from "react-icons/bs";
interface PaginationControlsProps {
  length: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  postId?: string;
  userName?: string;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  length,
  hasNextPage,
  hasPrevPage,
  postId,
  userName,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  return (
    <div className="flex gap-2 justify-center m-auto bg-fuchsia-900 bg-opacity-70 rounded-lg p-1">
      {postId ? (
        <button
          className="text-teal-400"
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(
              `/post/${postId}/?page=${Number(page) - 1}&per_page=${per_page}`
            );
          }}
        >
          <BsCaretLeftSquareFill size={24} />
        </button>
      ) : userName ? (
        <button
          className="text-teal-400"
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(
              `/profile/${userName}?page=${
                Number(page) - 1
              }&per_page=${per_page}`
            );
          }}
        >
          <BsCaretLeftSquareFill size={24} />
        </button>
      ) : (
        <button
          className="text-teal-400"
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
          }}
        >
          <BsCaretLeftSquareFill size={24} />
        </button>
      )}

      <div className="text-slate-200">
        {page} / {Math.ceil(length / Number(per_page))}
      </div>

      {postId ? (
        <button
          className="text-teal-400"
          disabled={!hasNextPage}
          onClick={() => {
            router.push(
              `/post/${postId}/?page=${Number(page) + 1}&per_page=${per_page}`
            );
          }}
        >
          <BsCaretRightSquareFill size={24} />
        </button>
      ) : userName ? (
        <button
          className="text-teal-400"
          disabled={!hasNextPage}
          onClick={() => {
            router.push(
              `/profile/${userName}?page=${
                Number(page) + 1
              }&per_page=${per_page}`
            );
          }}
        >
          <BsCaretRightSquareFill size={24} />
        </button>
      ) : (
        <button
          className="text-teal-400"
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
          }}
        >
          <BsCaretRightSquareFill size={24} />
        </button>
      )}
    </div>
  );
};

export default PaginationControls;
