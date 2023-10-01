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
        const formAvatar = form.getAll("avatar");
        const formBackground = form.getAll("background");

        const avatar = formAvatar[0] as FileEsque;
        const background = formBackground[0] as FileEsque;

        const { name, email, description, password } = updateProfileInfoValidator.parse({ name: formName, email: formEmail, description: formDescription, password: formPassword });

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

        if (!session) throw new Error();

        return { success: true, }
    } catch (error) {
        return { error };
    } finally {
        revalidatePath("/profile/edit");
    }
};

