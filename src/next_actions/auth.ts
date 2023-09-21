"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/redis";
import { getAuthSession } from "@/lib/auth"
import { registerValidator } from '../lib/validators';
import bcrypt from "bcryptjs"
export const register = async (form: FormData) => {
    try {
        const formEmail = form.getAll("email").toString()
        const formPassword = form.getAll("password").toString()
        const formName = form.getAll("name").toString()
        const { email, password, name } = registerValidator.parse({ email: formEmail, password: formPassword, name: formName })

        const hashedPassword = await bcrypt.hash(password, 10)

        const isThatUser = await db.user.findMany({
            where: {
                email
            },
        })

        if (isThatUser.length > 0) throw new Error()

        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            }
        })
        if (!user) throw new Error()
        return { success: true }
    } catch (error) {
        return { error }
    }
}