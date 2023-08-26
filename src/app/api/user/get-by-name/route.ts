import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const name = searchParams.get("name") || "Ja kub";
  const decodedName = decodeURI(name);
  const res = await db.user.findMany({
    where: {
      name: decodedName ?? "Ja kub",
    },
  });

  return NextResponse.json(res);
}
