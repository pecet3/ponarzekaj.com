import Image from "next/image";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import axios from "axios";
import { db } from "@/lib/db";
import type { Post, Comment, User } from "@prisma/client";
import { PostView } from "../components/PostView";
import type { FullPost } from "@/types/prisma";
import { CreatePost } from "../components/CreateAPost";
import { MainTile } from "@/components/MainTile";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await db.post.findMany({
    include: {
      comments: true,
      author: true,
      likes: true,
    },
    orderBy: [{ createdAt: "desc" }],
  });

  const user = await db.user.findUnique({
    where: {
      id: session ? session?.user.id : "",
    },
  });

  return (
    <MainTile>
      {session ? (
        <CreatePost user={user} />
      ) : (
        <p className="text-sm text-center italic">
          Tylko zalogowani użytkownicy mogą wstawiać posty
        </p>
      )}
      {posts.map((post) => {
        return <PostView key={post.id} post={post} />;
      })}
    </MainTile>
  );
}
