import { NextRequest } from "next/server";
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

    const likes = await db.likePost.findMany({
      where: {
        postId,
        userId,
      },
    });

    if (likes.length !== 0) {
      return new Response("User already liked it", { status: 403 });
    }

    await db.likePost.create({
      data: {
        userId,
        postId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return new Response("Server error", { status: 500 });
    }
    await db.notification.create({
      data: {
        userId: post?.authorId,
        content: "polubił Twój post",
        link: `/post/${postId}`,
        authorId: userId,
      },
    });
    revalidatePath("/");
    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid payload", { status: 422 });
    return new Response("Invalid request", { status: 400 });
  }
}
