"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/redis";
import { getAuthSession } from "@/lib/auth"
import { authValidator } from '../lib/validators';

export const register = async (form: FormData) => {
    try {
        const formEmail = form.getAll("email").toString()
        const formPassword = form.getAll("password").toString()

        const { email, password } = authValidator.parse({ email: formEmail, password: formPassword })

        const isThatUser = await db.user.findMany({
            where: {
                email
            }

        })

        if (isThatUser.length !== 0) throw new Error()


    } catch (error) {
        return { error }
    }
}