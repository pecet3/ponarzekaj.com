import React from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/PostView";
import { getAuthSession } from "@/lib/auth";
import { CommentView } from "@/components/CommentView";
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

  console.log(comments);

  return (
    <main>
      {comments.map((comment) => (
        <CommentView key={comment.id} comment={comment} />
      ))}
    </main>
  );
};

export default page;
