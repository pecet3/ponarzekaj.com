import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { db } from "@/lib/db";
import type { Post, Comment, User } from "@prisma/client";
import { PostView } from "../components/PostView";

type PostWithUser = Post & {
  comments: Comment[];
  author: User;
};
export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts: PostWithUser[] = await db.post.findMany({
    include: {
      comments: true,
      author: true,
    },
  });
  console.log(posts);
  return (
    <main className="flex flex-col min-h-screen  ">
      {posts.map((post) => {
        return <PostView key={post.id} post={post} />;
      })}
    </main>
  );
}
