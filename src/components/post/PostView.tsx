import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { FullPost } from "@/types/prisma";
import { Icons } from "../ui/Icons";
import { isUserThing } from "@/lib/helpers";
import { getAuthSession } from "@/lib/auth";
import { AddLikeDeleteComment } from "./Like&Delete&Comment";
import { LikesCommentsInfo } from "../LikesCommentsInfo";
import { db } from "@/lib/db";
dayjs.extend(relativeTime);

interface Props {
  post: FullPost;
}

export const PostView: React.FC<Props> = async ({ post }) => {
  const session = await getAuthSession();
  const isUserPost = isUserThing(post.authorId, session?.user.id as string);

  const likesLength = post.likes?.length;
  const commentsLength = post.comments.length;
  const authorRankObject = await db.user.findUnique({
    where: {
      id: post.authorId,
    },
    select: {
      rank: true,
    },
  });
  const authorRank = authorRankObject?.rank;
  if (!authorRank) return;
  const isLiked = post.likes?.find((like) => like.userId === session?.user.id);
  return (
    <div
      className={`${
        authorRank === "ADMIN"
          ? "bg-cyan-950"
          : authorRank === "MOD"
          ? "bg-sky-950"
          : authorRank === "PREMIUM"
          ? "bg-indigo-950"
          : "bg-slate-900 md:hover:bg-slate-950 duration-500 text-slate-200"
      }   w-full
      border-b-2 border-slate-400 px-1 py-2 sm:px-1.5 sm:py-2`}
    >
      <div className="flex items-end">
        <div className="flex justify-start gap-2 mb-2.5">
          <Link href={`/profile/${post.author.name}`} className="">
            <Image
              src={post.author.image || ""}
              alt={`zdjęcie profilowe użytkownika ${post.author.name}`}
              className="h-10 w-10 rounded-full md:h-12 md:w-12 p-[1px] bg-slate-400 shadow-sm shadow-black"
              width={96}
              height={96}
            />
          </Link>
          <div className="flex flex-col">
            <div className="flex gap-0.5 sm:gap-1 text-xs sm:text-sm  items-center flex-wrap">
              <Link href={`/profile/${post.author.name}`}>
                <span className="font-bold">{`@${post.author.name}`}</span>
              </Link>
              <Link href={`/post/${post.id}`}>
                <p className="font-light">{`∙ ${dayjs(
                  post.createdAt
                ).fromNow()}`}</p>
              </Link>
              <Link
                href={`/post/${post.id}`}
                className=" flex items-center justify-center text-right text-xs "
              >
                <p className="mx-1 font-thin">{` ∙`}</p>

                <LikesCommentsInfo
                  commentsLength={commentsLength}
                  likesLength={likesLength!}
                />
              </Link>
            </div>
            <Link
              href={`/post/${post.id}`}
              className="max-w-[17rem] grow sm:max-w-md md:max-w-[36rem] my-0.5 sm:my-0"
            >
              <span className="break-words text-lg">{post.content}</span>
              {post.fileUrl ? (
                <Image
                  src={post.fileUrl || ""}
                  alt="zdjęcie pod postem"
                  className="h-64 w-max md:h-96 rounded-md"
                  width={960}
                  height={480}
                />
              ) : null}
              <span className="mx-1 text-lg font-bold text-slate-400">{` ∙ ${
                post.emoji ?? "😐"
              }`}</span>
            </Link>
          </div>
        </div>
      </div>
      {session ? (
        <AddLikeDeleteComment
          postId={post.id}
          isLiked={isLiked}
          isUserPost={isUserPost}
          userId={session?.user.id}
        />
      ) : (
        <div className="opacity-0 p-1"></div>
      )}
    </div>
  );
};
