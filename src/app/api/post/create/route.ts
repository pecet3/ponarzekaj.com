import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createPostValidator } from "@/lib/validators";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";
import { ratelimit } from "@/lib/redis";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { content, emoji } = createPostValidator.parse(body);

    const session = await getAuthSession();
    const authorId = session?.user.id as string
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { success } = await ratelimit.post.limit(authorId);

    if (!success) {
      return new Response("TOO MANY REQUESTS", { status: 403 });
    }

    const post = await db.post.create({
      data: {
        authorId,
        emoji,
        content,
      },
    });

    const user = await db.user.findUnique({
      where: {
        id: authorId,
      },
      select: {
        friends: {
          where: {
            accepted: true,
          },
        },
      },
    });
    if (!user) return;

    for (const friend of user.friends) {
      await db.notification.create({
        data: {
          userId: friend.friendId,
          content: "opublikował post",
          link: `/post/${post.id}`,
          authorId: authorId,
        },
      });
    }
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid payload", { status: 422 });
    return new Response("Invalid request", { status: 400 });
  }
}
