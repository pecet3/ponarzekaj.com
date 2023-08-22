import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createCommentValidator } from "@/lib/validators";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getAuthSession();

    const {
      authorId: commentAuthorId,
      content,
      postId,
    } = createCommentValidator.parse(body);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (session.user.id !== commentAuthorId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.comment.create({
      data: {
        authorId: commentAuthorId,
        content,
        postId,
      },
    });

    const postAuthor = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postAuthor) {
      return new Response("SERVER ERROR", { status: 500 });
    }
    await db.notification.create({
      data: {
        userId: postAuthor?.authorId,
        content: "skomentował Twój post",
        link: `/post/${postId}`,
        authorId: session?.user.id,
      },
    });
    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid payload", { status: 422 });
    return new Response("Invalid request", { status: 400 });
  }
}
