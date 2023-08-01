"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegComments } from "react-icons/fa";
import type { Post, Comment, User } from "@prisma/client";
import type { FullPost } from "@/types/prisma";
dayjs.extend(relativeTime);

interface Props {
  post: FullPost;
}

export const PostView: React.FC<Props> = ({ post }) => {
  return (
    <div className="m-1 rounded-md bg-slate-700 shadow-md shadow-slate-950 text-slate-200">
      <div className="flex items-end">
        <div className="flex justify-start gap-2 px-1 pt-1 md:px-2 md:pt-2">
          <Link href={`/@${post.author.name}`} className="">
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
              <Link href={`/@${post.author.name}`}>
                <span className="font-bold">{`@${post.author.name}`}</span>
              </Link>
              <Link href={`/post/${post.id}`}>
                <span className="font-thin">{`∙ ${dayjs(
                  post.createdAt
                ).fromNow()}`}</span>
              </Link>
              <Link
                href={`/post/${post.id}`}
                className="mr-1 flex items-center justify-center text-right text-xs"
              >
                <p className="mx-1 font-thin">{` ∙`}</p>
                <FaRegComments size={16} className="mr-1 text-blue-500" />
                Comments({post.comments.length})
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
        {true ? (
          <button className="flex items-center gap-1 text-sm text-gray-500 ">
            ❌delete
            <i className="text-xs font-extralight text-slate-200">{`∙`}</i>
          </button>
        ) : null}
        <span className=" flex items-center justify-center text-xs ">
          <IoMdAddCircleOutline size={16} className="text-green-500" />
          Add a comment
        </span>
      </Link>
    </div>
  );
};
