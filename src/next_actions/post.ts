"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/redis";
import { getAuthSession } from "@/lib/auth";
import { PostInput } from "@/components/post/CreateAPost";
import { utapi } from "uploadthing/server";
import { createPostValidator, postValidator } from '../lib/validators';

interface FileEsque extends Blob {
  name: string;
}

export const createAPost = async (form: FormData, input: PostInput) => {
  try {
    const session = await getAuthSession();
    const authorId = session?.user.id as string;

    const { emoji, content } = createPostValidator.parse({ emoji: input.emoji, content: input.content });

    const files = form.getAll("files");

    const file = files[0] as FileEsque;

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
      return { success: true };
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
          postId: post.id,
        },
      });
    }
    return { success: true };
  } catch (error) {
    return { error };
  } finally {
    revalidatePath("/");
  }
};

export const addALike = async (postId: string) => {
  try {
    // const { postId, userId } = postValidator.parse(body);

    const session = await getAuthSession();
    const userId = session?.user.id
    const { success } = await ratelimit.notification.limit(userId as string);

    if (!success) {
      throw new Error("TOO MANY REQUESTS");
    }
    if (!session) {
      throw new Error("Unauthorized");
    }

    if (session.user.id !== userId) {
      throw new Error()
    }

    const likes = await db.likePost.findMany({
      where: {
        postId,
        userId,
      },
    });

    if (likes.length !== 0) {
      throw new Error()
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
      throw new Error()
    }
    if (session.user.id !== post.authorId) {
      await db.notification.create({
        data: {
          userId: post?.authorId,
          content: "polubił Twój post",
          link: `/post/${postId}`,
          authorId: userId,
          postId: postId
        },
      });
    }

    return { success: true };

  } catch (error) {
    return { error }
  } finally {
    revalidatePath("/")
  }
}

export const deleteAPost = async (postId: string) => {
  try {
    const session = await getAuthSession();
    const userId = session?.user.id
    if (!session) {
      throw new Error()
    }
    if (session.user.id !== userId) {
      throw new Error()
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

    await db.notification.deleteMany({
      where: {
        postId: postId,
      },
    });

    return { success: true }
  } catch (error) {
    return { error }
  } finally {
    revalidatePath("/");
  }
}

export const deleteALike = async (postId: string) => {
  try {
    const session = await getAuthSession();
    const userId = session?.user.id
    if (!session) {
      throw new Error()
    }

    if (session.user.id !== userId) {
      throw new Error()
    }

    await db.likePost.deleteMany({
      where: {
        AND: [
          {
            postId,
          },
          {
            userId,
          },
        ],
      },
    });

    return { success: true }
  } catch (error) {
    return { error }
  } finally {
    revalidatePath("/");
  }
}
