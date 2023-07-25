import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { db } from "@/lib/db";
import type { Post, Comment, User } from "@prisma/client";

type PostWithUser = Post & {
  comments: Comment[];
};
export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts: PostWithUser[] = await db.post.findMany({
    include: {
      comments: true,
      likes: true,
    },
  });
  console.log(posts[0].comments);
  return <main className="flex min-h-screen flex-col background">post</main>;
}
