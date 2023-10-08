"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { utapi } from "uploadthing/server";
import { updateProfileInfoValidator } from '../lib/validators';
import bcrypt from "bcryptjs"
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

        if (!session) throw new Error()

        const { name } = updateProfileInfoValidator.parse({ name: formName });
        const user = await db.user.findUnique({
            where:
                { id: session.user.id }
        })
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

        if (password && password !== "") {
            const hashedPassword = await bcrypt.hash(password, 10)
            await db.user.update({
                where: {
                    id: session?.user.id
                },
                data: {
                    password: hashedPassword
                }
            })
        }

        if (avatar.size > 0) {
            const response = await utapi.uploadFiles(avatar as FileEsque);

            console.log(response)
            if (user?.imageKey) {
                await utapi.deleteFiles(user.imageKey);
            }
            await db.user.update({
                where: {
                    id: session?.user.id
                },
                data: {
                    image: response.data?.url,
                    imageKey: response.data?.key,
                }
            })
        }
        console.log(background)
        if (background.size > 0) {
            const response = await utapi.uploadFiles(background as FileEsque);
            console.log(response)
            if (user?.backgroundImageKey && user?.backgroundImageKey !== "") {
                await utapi.deleteFiles(user.backgroundImageKey);
            }
            await db.user.update({
                where: {
                    id: session?.user.id
                },
                data: {
                    backgroundImage: response.data?.url,
                    backgroundImageKey: response.data?.key,
                }
            })
        }

        return { success: true, }
    } catch (error: any) {
        return { error: error.message };
    } finally {
        revalidatePath("/profile/edit");
    }
};

