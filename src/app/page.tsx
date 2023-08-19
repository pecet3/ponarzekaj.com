import Image from "next/image";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import axios from "axios";
import { db } from "@/lib/db";
import type { Post, Comment, User } from "@prisma/client";
import { PostView } from "@/components/post/PostView";
import type { FullPost } from "@/types/prisma";
import { CreatePost } from "@/components/post/CreateAPost";
import { MainTile } from "@/components/MainTile";
import PaginationControls from "@/components/PaginationControls";
import { Icons } from "@/components/ui/Icons";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthSession();

  const posts = await db.post.findMany({
    include: {
      comments: true,
      author: true,
      likes: true,
    },
    orderBy: [{ createdAt: "desc" }],
  });

  const user = await db.user.findUnique({
    where: {
      id: session ? session?.user.id : "",
    },
  });
  if (!session || !user || !posts) {
    return (
      <MainTile>
        <Icons.Spinner
          size={124}
          className="animate-spin duration-300 text-slate-200 flex m-auto justify-center my-96"
        />
      </MainTile>
    );
  }
  // pagination things

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = posts.slice(start, end);

  return (
    <MainTile>
      {session ? (
        <CreatePost user={user} />
      ) : (
        <p className="text-sm text-center italic text-white ">
          Nie masz konta?{" "}
          <Link
            href="/sign-in?first-time=true"
            className="border-b-sky-600 text-sky-600"
          >
            Zarejestruj się
          </Link>
        </p>
      )}
      {entries.map((post) => {
        return <PostView key={post.id} post={post} />;
      })}
      <PaginationControls
        length={posts.length}
        hasNextPage={end < posts.length}
        hasPrevPage={start > 0}
      />
    </MainTile>
  );
}
