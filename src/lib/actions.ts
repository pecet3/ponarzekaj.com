"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { ratelimit } from "./redis";
import { getAuthSession } from "./auth";

const createAPost = async (
  form: FormData,
  authorId: string,
  emoji: string,
  content: string
) => {
  try {
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
  } catch (error) {
    return {
      error,
    };
  }
};
export const createAComment = async (form: FormData, postId: string) => {
  const session = await getAuthSession();
  const content = form.get("content");
  await db.comment.create({
    data: {
      authorId: session?.user.id as string,
      content: content as string,
      postId,
    },
  });
  revalidatePath(`/post/${postId}`);
};
