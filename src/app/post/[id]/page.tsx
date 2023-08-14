import React from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { CommentView } from "@/components/commentView/CommentView";
import { MainTile } from "@/components/MainTile";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isUserThing } from "@/lib/helpers";
import { CreateComment } from "@/components/CreateAComment";
import PaginationControls from "@/components/PaginationControls";
import { LikesCommentsInfo } from "@/components/LikesCommentsInfo";
dayjs.extend(relativeTime);

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: PageProps) => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session ? session?.user.id : "",
    },
  });

  const { id } = params;

  const comments = await db.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      likes: true,
    },
    orderBy: [{ createdAt: "desc" }],
  });

  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: true,
      author: true,
      likes: true,
    },
  });

  const isUserPost = isUserThing(
    session?.user.id as string,
    post?.authorId as string
  );

  // pagination things

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = comments.slice(start, end);
  if (!post) return null;
  return (
    <MainTile>
      <div className="rounded-md bg-slate-950 text-slate-200 w-full">
        <div className="flex items-end">
          <div className="flex justify-start gap-2 p-1 md:p-2">
            <Link href={`/profile/${post.author.name}`} className="">
              <Image
                src={post.author.image || ""}
                alt={`@${post.author.name}'s avatar`}
                className="h-10 w-10 rounded-full md:h-12 md:w-12"
                width={48}
                height={48}
              />
            </Link>
            <div className="flex flex-col break-words">
              <div className="flex gap-0.5 sm:gap-1 text-xs sm:text-sm text-slate-300 items-center">
                <Link href={`/profile/${post.author.name}`}>
                  <span className="font-bold">{`@${post.author.name}`}</span>
                </Link>

                <p className="font-thin">{`∙ ${dayjs(
                  post.createdAt
                ).fromNow()}`}</p>

                <div className=" flex items-center justify-center text-right text-xs ">
                  <p className="mx-1 font-thin">{` ∙`}</p>
                  <LikesCommentsInfo
                    commentsLength={post.comments.length}
                    likesLength={post.comments.length}
                  />
                </div>

                {isUserPost ? (
                  <button className="flex items-center gap-1 text-sm text-gray-500 ">
                    <p className="mx-1 font-thin text-xs  text-slate-200">{` ∙`}</p>
                    <Icons.Delete size={16} className="text-red-400" />{" "}
                    <p className="hidden sm:block">Usuń</p>
                  </button>
                ) : null}
              </div>
              <div className="max-w-[16rem] grow sm:max-w-md md:max-w-[36rem]">
                <span className=" break-words text-base md:text-lg">
                  {post.content}
                </span>
                <span className="mx-1 text-xl font-bold text-slate-400">{` ∙ ${
                  post.emoji ?? "😐"
                }`}</span>
              </div>
            </div>
          </div>
        </div>
        {session ? <CreateComment user={user} postId={id} /> : null}
      </div>
      {entries.map((comment) => (
        <CommentView key={comment.id} comment={comment} />
      ))}
      <PaginationControls
        hasNextPage={end < comments.length}
        hasPrevPage={start > 0}
        postId={post.id}
        length={comments.length}
      />
    </MainTile>
  );
};

export default page;
