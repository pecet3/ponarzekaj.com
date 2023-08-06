import React from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/PostView";
import { getAuthSession } from "@/lib/auth";
import { CommentView } from "@/components/CommentView";
import { MainTile } from "@/components/MainTile";
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
  console.log(comments);
  if (!post) return null;
  return (
    <MainTile>
      <PostView post={post} />
      {session ? (
        <p>create</p>
      ) : (
        <p className="text-sm text-center italic">
          Tylko zalogowani użytkownicy mogą wstawiać posty
        </p>
      )}
      {comments.map((comment) => (
        <CommentView key={comment.id} comment={comment} />
      ))}
    </MainTile>
  );
};

export default page;
