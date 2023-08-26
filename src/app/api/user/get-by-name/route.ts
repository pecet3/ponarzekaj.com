import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const name = searchParams.get("name") || "";

  const res = await db.user.findMany({
    where: {
      name: name,
    },
  });

  return NextResponse.json(res);
}
