import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { postValidator } from "@/lib/validators";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId, postId } = postValidator.parse(body);

    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (session.user.id !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const commentsList = await db.comment.findMany({
      where: {
        postId: postId,
      },
      select: {
        id: true,
      },
    });

    const commentsArray = commentsList.map((comment) => comment.id);

    for (const commentId of commentsArray) {
      await db.likeComment.deleteMany({
        where: {
          commentId,
        },
      });
    }

    await db.comment.deleteMany({
      where: {
        postId: postId,
      },
    });

    await db.likePost.deleteMany({
      where: {
        postId: postId,
      },
    });

    await db.post.deleteMany({
      where: {
        id: postId,
      },
    });
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid payload", { status: 422 });
    return new Response(error?.toString(), { status: 400 });
  }
}
