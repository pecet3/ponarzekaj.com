
import { NextResponse, NextRequest } from 'next/server'
import { db } from '@/lib/db';
import { z } from "zod"
import { getAuthSession } from '@/lib/auth';

export const createPostValidator = z.object({
    content: z.string(),
    authorId: z.string(),
    emoji: z.string().emoji(),
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const { content, authorId, emoji } = createPostValidator.parse(body)

        const session = getAuthSession()

        if (!session) {
            return new Response("Unauthorized", { status: 401 })
        }

        await db.post.create({
            data: {
                authorId,
                emoji,
                content,
            }
        })


        return new Response("OK", { status: 200 })
    } catch (error) {

    }



}