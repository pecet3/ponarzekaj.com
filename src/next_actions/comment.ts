"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/redis";
import { getAuthSession } from "@/lib/auth";
import { commentValidator, createCommentValidator } from '../lib/validators';

export const createAComment = async (form: FormData, formPostId: string, formAuthorId: string) => {
  try {
    const session = await getAuthSession();
    const formContent = form.getAll("content")?.toString() as string;

    if (!session) throw new Error();

    const { authorId, postId, content } = createCommentValidator.parse({ authorId: formAuthorId, postId: formPostId, content: formContent });

    const { success } = await ratelimit.comment.limit(session.user.id);

    if (!success) throw new Error();

    const comment = await db.comment.create({
      data: {
        authorId,
        content,
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
          commentId: comment.id
        },
      });
    }
    return { success: "success" };
  } catch (error) {
    return { error: error };
  } finally {
    revalidatePath(`/post/${formPostId}`);
  }
};

export const addALike = async (userId: string, commentId: string) => {
  try {

    const body = commentValidator.parse({ userId, commentId });

    const session = await getAuthSession();

    if (!session) {
      throw new Error("Unauthorized");
    }
    const { success } = await ratelimit.notification.limit(session.user.id);

    if (!success) {
      throw new Error("Too many requests");
    }

    if (session.user.id !== userId) {
      throw new Error("Unauthorized");
    }
    const comment = await db.comment.findUnique({
      where: {
        id: body.commentId,
      },
    });
    if (!comment) {
      throw new Error("Server error");
    }
    if (session.user.id !== comment.authorId) {
      await db.notification.create({
        data: {
          userId: comment.authorId,
          authorId: userId,
          content: "polubił Ci komentarz!",
          link: `/post/${comment.postId}`,
        },
      });
    }

    await db.likeComment.create({
      data: {
        userId: body.userId,
        commentId: body.commentId,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return { error }
  }
}