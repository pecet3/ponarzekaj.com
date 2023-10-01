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
        const formName = form.getAll("name").toString();
        const formEmail = form.getAll("email").toString();
        const formDescription = form.getAll("description").toString();
        const formPassword = form.getAll("password").toString();
        const formAvatar = form.getAll("avatar");
        const formBackground = form.getAll("background");

        const avatar = formAvatar[0] as FileEsque;
        const background = formBackground[0] as FileEsque;

        const { name } = updateProfileInfoValidator.parse({ name: formName });
        if (name && name !== "") {
            await db.user.update({
                where: {
                    id: session?.user.id
                },
                data: {
                    name
                }
            })
        }
        const { email } = updateProfileInfoValidator.parse({ email: formEmail });
        if (email && email !== "") {
            await db.user.update({
                where: {
                    id: session?.user.id
                },
                data: {
                    email
                }
            })
        }
        const { description } = updateProfileInfoValidator.parse({ description: formDescription });
        if (description && description !== "") {
            await db.user.update({
                where: {
                    id: session?.user.id
                },
                data: {
                    description
                }
            })
        }
        const { password } = updateProfileInfoValidator.parse({ password: formPassword });
        if (name && name !== "") {
            await db.user.update({
                where: {
                    id: session?.user.id
                },
                data: {
                    password
                }
            })
        }

        if (!session) throw new Error();

        return { success: true, }
    } catch (error) {
        return { error: true };
    } finally {
        revalidatePath("/profile/edit");
    }
};

