import { NextResponse } from 'next/server'
import { db } from '@/lib/db';

export async function GET() {
    const res = await db.post.findMany({
        include: {
            comments: true,
            author: true,
            likes: true,
        },
    });


    return NextResponse.json({ res })
}