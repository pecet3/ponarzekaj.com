"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BsCaretRightSquareFill, BsCaretLeftSquareFill } from "react-icons/bs";
interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  return (
    <div className="flex gap-2 justify-center m-auto bg-fuchsia-900 bg-opacity-70 rounded-lg p-1">
      <button
        className="text-teal-400"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        <BsCaretLeftSquareFill size={24} />
      </button>

      <div className="text-slate-200">
        {page} /{" "}
        {Math.ceil((Number(page) * Number(per_page)) / Number(per_page))}
      </div>

      <button
        className="text-teal-400"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        <BsCaretRightSquareFill size={24} />
      </button>
    </div>
  );
};

export default PaginationControls;
