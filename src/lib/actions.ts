"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { ratelimit } from "./redis";
import { getAuthSession } from "./auth";
import { PostInput } from "@/components/post/CreateAPost";
import { utapi } from "uploadthing/server";

interface FileEsque extends Blob {
  name: string;
}

export const createAPost = async (form: FormData, input: PostInput) => {
  try {
    const { emoji, content } = input;

    const files = form.getAll("files");

    const file = files[0] as FileEsque;

    const session = await getAuthSession();
    const authorId = session?.user.id as string;

    if (!session) throw new Error();

    const { success } = await ratelimit.post.limit(authorId);

    if (!success) throw new Error();

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
    if (!user) throw new Error();

    if (file.size > 0) {
      const response = await utapi.uploadFiles(file as FileEsque);

      const post = await db.post.create({
        data: {
          authorId,
          emoji,
          content,
          fileUrl: response.data?.url,
          fileKey: response.data?.key,
        },
      });

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
      return { success: "success" };
    }

    const post = await db.post.create({
      data: {
        authorId,
        emoji,
        content,
      },
    });

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
    return { success: "success" };
  } catch (error) {
    return { error: error };
  } finally {
    revalidatePath("/");
  }
};

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
