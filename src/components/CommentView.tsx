import { db } from "@/lib/db";
import { FullComment } from "@/types/prisma";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Icons } from "./ui/Icons";
import { FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

interface Props {
  comment: FullComment;
}

export const CommentView: FunctionComponent<Props> = async ({ comment }) => {
  const author = await db.user.findUnique({
    where: {
      id: comment.authorId,
    },
  });
  return (
    <div className="rounded-md bg-slate-700 hover:bg-slate-800 duration-300 md:hover:scale-[1.008] shadow-md shadow-slate-950 text-slate-200 w-full">
      <div className="flex items-end">
        <div className="flex justify-start gap-2 px-1 pt-1 md:px-2 md:pt-2">
          <Link href={`/profile/${author?.name}`} className="">
            <Image
              src={author?.image || ""}
              alt={`@${author?.name}'s avatar`}
              className="h-10 w-10 rounded-full md:h-12 md:w-12"
              width={48}
              height={48}
            />
          </Link>
          <div className="flex flex-col">
            <div className="flex gap-1 text-sm text-slate-300">
              <Link href={`/profile/${author?.name}`}>
                <span className="font-bold">{`@${author?.name}`}</span>
              </Link>

              <span className="font-thin">{`∙ ${dayjs(
                comment.createdAt
              ).fromNow()}`}</span>

              <div className="mr-1 flex items-center justify-center text-right text-xs ">
                <p className="mx-1 font-thin">{` ∙`}</p>
                <div className="bg-zinc-900 rounded-xl px-1 flex py-0.5">
                  <Icons.Like size={16} className="mr-1 text-blue-700" />
                  {comment.likes?.length}
                </div>
              </div>
            </div>
            <div className="max-w-[16rem] grow sm:max-w-md md:max-w-[36rem]">
              <span className=" break-words text-base md:text-lg">
                {comment.content}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto mb-1 mr-1 flex justify-end gap-2">
        <button className="flex items-center gap-1 text-sm text-gray-500 ">
          <Icons.Delete size={16} className="text-red-400" /> Usuń
          <i className="text-xs font-extralight text-slate-200">{`∙`}</i>
        </button>
        <span className=" flex items-center justify-center text-xs ">
          <Icons.AddComment size={16} className="text-green-500" /> Skomentuj
        </span>
      </div>
    </div>
  );
};
