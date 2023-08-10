import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createPostValidator } from "@/lib/validators";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { content, authorId, emoji } = createPostValidator.parse(body);

    const session = getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.post.create({
      data: {
        authorId,
        emoji,
        content,
      },
    });


    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid payload", { status: 422 });
    return new Response("Invalid request", { status: 400 });
  }
}
