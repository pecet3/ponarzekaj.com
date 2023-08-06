import React from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
import { PostView } from "@/components/PostView";
interface PageProps {
  params: {
    name: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { name } = params;

  const data = await db.user.findMany({
    where: {
      name: decodeURI(name),
    },
  });

  const user = data[0];

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      comments: true,
      author: true,
      likes: true,
    },
  });

  if (data.length === 0) return <Error />;

  return (
    <main className="flex flex-col min-h-screen m-auto mt-0 sm:mt-2 justify-start items-center">
      <section className="rounded-md bg-indigo-500 bg-opacity-60 flex flex-col shadow-lg shadow-indigo-600 max-w-3xl">
        <div className="relative">
          <Image
            src={user.backgroundImage ?? ""}
            alt={`zdjęcie ${user.name}`}
            height={1280}
            width={720}
            className="h-64 sm:h-96 sm:rounded-t-md  w-screen"
          />
          <Image
            src={user.image ?? ""}
            alt={`zdjęcie ${user.name}`}
            height={256}
            width={256}
            className="absolute rounded-full w-32 h-32  sm:w-40 sm:h-40 left-3 bottom-[-4rem] sm:bottom-[-5rem] "
          />
        </div>
        <span className="flex justify-center flex-col sm:ml-48 ml-40 mt-2">
          <p className="text-xl sm:text-2xl text-slate-800">{user.name}</p>
          <p className="text-base sm:text-xl text-slate-600">{user.email}</p>
        </span>
        <section className="mt-10 p-1 sm:p-2 flex flex-col gap-2 ">
          {posts.map((post) => {
            return <PostView post={post} key={post.id} />;
          })}
        </section>
      </section>
    </main>
  );
};

export default page;
