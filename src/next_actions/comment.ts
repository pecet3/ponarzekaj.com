"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/redis";
import { getAuthSession } from "@/lib/auth";

export const createAComment = async (form: FormData, postId: string) => {
  try {
    const session = await getAuthSession();
    const content = form.get("content");

    if (!session) throw new Error();

    const { success } = await ratelimit.comment.limit(session.user.id);

    if (!success) throw new Error();

    await db.comment.create({
      data: {
        authorId: session?.user.id as string,
        content: content as string,
        postId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error();
    }

    if (session.user.id !== post.authorId) {
      await db.notification.create({
        data: {
          userId: post?.authorId,
          content: "skomentował Twój post",
          link: `/post/${postId}`,
          authorId: session?.user.id,
        },
      });
    }
    return { success: "success" };
  } catch (error) {
    return { error: error };
  } finally {
    revalidatePath(`/post/${postId}`);
  }
};