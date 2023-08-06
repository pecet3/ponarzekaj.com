import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaRegComments } from "react-icons/fa";
import type { FullPost } from "@/types/prisma";
import { Icons } from "./ui/Icons";
import { isUserThing } from "@/lib/helpers";
import { getAuthSession } from "@/lib/auth";

dayjs.extend(relativeTime);

interface Props {
  post: FullPost;
}

export const PostView: React.FC<Props> = async ({ post }) => {
  const session = await getAuthSession();
  const isUserPost = isUserThing(post.authorId, session?.user.id as string);
  return (
    <div className="rounded-md bg-indigo-900 hover:bg-indigo-800 duration-300 md:hover:scale-[1.005] shadow-md shadow-slate-950 text-slate-200 w-full">
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
                  <FaRegComments size={16} className="mr-1 text-emerald-500" />
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
            <i className="text-xs font-extralight text-slate-200">{`∙`}</i>
          </button>
        ) : null}
        <span className=" flex items-center justify-center text-xs ">
          <Icons.AddComment size={16} className="text-green-500" /> Skomentuj
        </span>
      </Link>
    </div>
  );
};
