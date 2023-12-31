import { db } from "@/lib/db";
import { FullComment } from "@/types/prisma";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Icons } from "../ui/Icons";
import { FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { getAuthSession } from "@/lib/auth";
import { isUserThing } from "@/lib/helpers";
import { AddLikeDelete } from "./Like&Delete";
dayjs.extend(relativeTime);

interface Props {
  comment: FullComment;
}

export const CommentView: FunctionComponent<Props> = async ({ comment }) => {
  const session = await getAuthSession();
  const author = await db.user.findUnique({
    where: {
      id: comment.authorId,
    },
  });

  const isUserComment = isUserThing(
    author?.id as string,
    session?.user.id as string
  );

  const isLiked = comment.likes?.find(
    (like) => like.userId === session?.user.id
  );

  return (
    <div className="border-b-2 border-slate-400 bg-slate-900 hover:bg-slate-950 duration-300 text-slate-200 w-full p-1 sm:p-2">
      <div className="flex items-end">
        <div className="flex justify-start gap-2">
          <Link href={`/profile/${author?.name}`} className="">
            <Image
              src={author?.image || ""}
              alt={`@${author?.name}'s avatar`}
              className="h-10 w-10 rounded-full md:h-12 md:w-12"
              width={96}
              height={96}
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
                <div className="bg-blue-950 rounded-xl px-1 flex py-0.5 font-semibold text-slate-200">
                  <Icons.Like size={16} className=" text-blue-600" />
                  {comment.likes?.length}
                </div>
              </div>
            </div>
            <div className="max-w-[17rem] grow sm:max-w-md md:max-w-[36rem]">
              <span className=" break-words text-lg">{comment.content}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto mb-1 mr-1 flex justify-end gap-2">
        {session ? (
          <AddLikeDelete
            commentId={comment.id}
            userId={session?.user.id}
            isLiked={isLiked}
            isUserComment={isUserComment}
          />
        ) : (
          <div className="opacity-0 p-1"></div>
        )}
      </div>
    </div>
  );
};
