import React from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/post/PostView";
import PaginationControls from "@/components/PaginationControls";
import { MainTile } from "@/components/MainTile";
import { Icons } from "@/components/ui/Icons";
import { getAuthSession } from "@/lib/auth";
import { isUserThing } from "@/lib/helpers";

interface PageProps {
  params: {
    name: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ params, searchParams }: PageProps) => {
  const { name } = params;
  const decodedName = decodeURI(name);

  const session = await getAuthSession();
  const data = await db.user.findMany({
    where: {
      name: decodedName,
    },
    include: {
      friends: true,
    },
  });

  const user = data[0];
  console.log(user);
  const posts = await db.post.findMany({
    where: {
      authorId: user.id ?? "",
    },
    include: {
      comments: true,
      author: true,
      likes: true,
    },
    orderBy: [{ createdAt: "desc" }],
  });

  if (data.length === 0 || !posts) return <Error />;

  const isUserProfile = isUserThing(session?.user.id as string, user.id);

  async function addFriend() {
    "use server";
    if (!session || isUserProfile) return;

    await db.friend.create({
      data: {
        userId: user.id,
        friendId: session?.user.id,
      },
    });
  }

  // pagination things

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = posts.slice(start, end);

  return (
    <MainTile paddingBottom>
      <div className="relative">
        <Image
          src={user.backgroundImage ?? ""}
          alt={`zdjęcie ${user.name}`}
          height={1280}
          width={720}
          className="h-56 sm:h-96 sm:rounded-t-xl  w-screen"
        />
        <Image
          src={user.image ?? ""}
          alt={`zdjęcie ${user.name}`}
          height={700}
          width={700}
          className="absolute rounded-full w-32 h-32  sm:w-40 sm:h-40 left-3 bottom-[-4rem] sm:bottom-[-5rem] "
        />
      </div>
      <div className="flex justify-center flex-col sm:ml-48 ml-40 mt-2 text-slate-200">
        <span>
          <p className="text-xl sm:text-2xl  font-bold">{user.name}</p>
          <p className="text-base sm:text-xl ">{user.email}</p>
        </span>
        <form action={addFriend}>
          <button type="submit" className="text-white ">
            <Icons.AddFriend size={16} />
          </button>
        </form>
      </div>
      <div className="mt-10  flex flex-col border-t-2 border-slate-400">
        {entries.map((post) => {
          return <PostView post={post} key={post.id} />;
        })}
      </div>
      <PaginationControls
        hasNextPage={end < posts.length}
        hasPrevPage={start > 0}
        postId={decodedName}
        length={posts.length}
      />
    </MainTile>
  );
};

export default page;
