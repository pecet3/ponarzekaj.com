import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { db } from "@/lib/db";
import type { Post, Comment, User } from "@prisma/client";
import { PostView } from "../components/PostView";
import type { FullPost } from "@/types/prisma";
import { CreatePost } from "../components/CreateAPost";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts = await db.post.findMany({
    include: {
      comments: true,
      author: true,
      likes: true,
    },
  });

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  console.log(user);
  return (
    <main className="flex min-h-screen flex-col items-center background">
      <section className="w-full max-w-3xl flex flex-col gap-2 sm:mt-2 rounded-md bg-indigo-400 bg-opacity-60 p-1 sm:p-2">
        <CreatePost user={user} />
        {posts.map((post) => {
          return <PostView key={post.id} post={post} />;
        })}
      </section>
    </main>
  );
}
