import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaRegComments } from "react-icons/fa";
import type { FullPost } from "@/types/prisma";
import { Icons } from "../ui/Icons";
import { isUserThing } from "@/lib/helpers";
import { getAuthSession } from "@/lib/auth";
import { AddLikeDeleteComment } from "./Like&Delete&Comment";
import { LikesCommentsInfo } from "../LikesCommentsInfo";

dayjs.extend(relativeTime);

interface Props {
  post: FullPost;
}

export const PostView: React.FC<Props> = async ({ post }) => {
  const session = await getAuthSession();
  const isUserPost = isUserThing(post.authorId, session?.user.id as string);

  const isLiked = post.likes?.find((like) => like.userId === session?.user.id);

  return (
    <div
      className=" bg-slate-900 hover:bg-slate-950 duration-300 text-slate-200 w-full
    border-b-2 border-slate-400 px-1 py-2 sm:px-1.5 sm:py-2"
    >
      <div className="flex items-end">
        <div className="flex justify-start gap-2 ">
          <Link href={`/profile/${post.author.name}`} className="">
            <Image
              src={post.author.image || ""}
              alt={`@${post.author.name}'s avatar`}
              className="h-10 w-10 rounded-full md:h-12 md:w-12"
              width={96}
              height={96}
            />
          </Link>
          <div className="flex flex-col">
            <div className="flex gap-0.5 sm:gap-1 text-xs sm:text-sm text-slate-300 items-center">
              <Link href={`/profile/${post.author.name}`}>
                <span className="font-bold">{`@${post.author.name}`}</span>
              </Link>
              <Link href={`/post/${post.id}`}>
                <p className="font-thin">{`∙ ${dayjs(
                  post.createdAt
                ).fromNow()}`}</p>
              </Link>
              <Link
                href={`/post/${post.id}`}
                className=" flex items-center justify-center text-right text-xs "
              >
                <p className="mx-1 font-thin">{` ∙`}</p>

                <LikesCommentsInfo
                  commentsLength={post.comments.length}
                  likesLength={post.comments.length}
                />
              </Link>
            </div>
            <Link
              href={`/post/${post.id}`}
              className="max-w-[17rem] grow sm:max-w-md md:max-w-[36rem] my-2"
            >
              <span className=" break-words text-base md:text-lg">
                {post.content}
              </span>
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
