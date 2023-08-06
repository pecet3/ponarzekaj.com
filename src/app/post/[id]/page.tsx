import React from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { CommentView } from "@/components/CommentView";
import { MainTile } from "@/components/MainTile";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isUserThing } from "@/lib/helpers";

dayjs.extend(relativeTime);

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
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

  if (!post) return null;
  return (
    <MainTile>
      <div className="rounded-md bg-indigo-800 shadow-md shadow-slate-950 text-slate-200 w-full">
        <div className="flex items-end">
          <div className="flex justify-start gap-2 px-1 pt-1 md:px-2 md:pt-2">
            <Link href={`/profile/${post.author.name}`} className="">
              <Image
                src={post.author.image || ""}
                alt={`@${post.author.name}'s avatar`}
                className="h-10 w-10 rounded-full md:h-12 md:w-12"
                width={48}
                height={48}
              />
            </Link>
            <div className="flex flex-col">
              <div className="flex gap-1 text-sm text-slate-300">
                <Link href={`/profile/${post.author.name}`}>
                  <span className="font-bold">{`@${post.author.name}`}</span>
                </Link>
                <Link href={`/post/${post.id}`}>
                  <span className="font-thin">{`∙ ${dayjs(
                    post.createdAt
                  ).fromNow()}`}</span>
                </Link>
                <Link
                  href={`/post/${post.id}`}
                  className=" flex items-center justify-center text-right text-xs "
                >
                  <p className="mx-1 font-thin">{` ∙`}</p>
                  <div className="bg-zinc-900 rounded-xl px-1 flex py-0.5">
                    <Icons.Comments
                      size={16}
                      className="mr-1 text-emerald-500"
                    />
                    {post.comments.length}
                  </div>
                </Link>
                <Link
                  href={`/post/${post.id}`}
                  className="mr-1 flex items-center justify-center text-right text-xs "
                >
                  <p className="mx-1 font-thin">{` ∙`}</p>
                  <div className="bg-zinc-900 rounded-xl px-1 flex py-0.5">
                    <Icons.Like size={16} className="mr-1 text-blue-700" />
                    {post.likes?.length}
                  </div>
                </Link>
              </div>
              <Link
                href={`/post/${post.id}`}
                className="max-w-[16rem] grow sm:max-w-md md:max-w-[36rem]"
              >
                <span className=" break-words text-base md:text-lg">
                  {post.content}
                </span>
                <span className="mx-1 text-xl font-bold text-slate-400">{` ∙ ${
                  post.emoji ?? "😐"
                }`}</span>
              </Link>
            </div>
          </div>
        </div>
        <Link
          href={`/post/${post.id}`}
          className="m-auto mb-1 mr-1 flex justify-end gap-2"
        >
          {isUserPost ? (
            <button className="flex items-center gap-1 text-sm text-gray-500 ">
              <Icons.Delete size={16} className="text-red-400" /> Usuń
            </button>
          ) : null}
        </Link>
      </div>
      {session ? (
        <p>create</p>
      ) : (
        <p className="text-sm text-center italic">
          Tylko zalogowani użytkownicy mogą komentować
        </p>
      )}
      {comments.map((comment) => (
        <CommentView key={comment.id} comment={comment} />
      ))}
    </MainTile>
  );
};

export default page;
