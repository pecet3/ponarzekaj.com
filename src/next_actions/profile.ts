"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/redis";
import { getAuthSession } from "@/lib/auth";
import { PostInput } from "@/components/post/CreateAPost";
import { utapi } from "uploadthing/server";
import { createPostValidator, postValidator, updateProfileInfoValidator } from '../lib/validators';

interface FileEsque extends Blob {
    name: string;
}

export const updateProfile = async (form: FormData) => {
    try {
        const session = await getAuthSession();
        const formName = form.getAll("name");
        const formEmail = form.getAll("email");
        const formDescription = form.getAll("description");
        const formPassword = form.getAll("password");

        const { name, email, description, password } = updateProfileInfoValidator.parse({ name: formName, email: formEmail, description: formDescription, password: formPassword });

        const files = form.getAll("files");

        const file = files[0] as FileEsque;

        if (!session) throw new Error();


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

        const post = await db.post.findUnique({
            where: {
                id: postId
            }
        })
        if (!post) throw new Error()

        if (post.fileKey) {
            await utapi.deleteFiles(post.fileKey);
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
