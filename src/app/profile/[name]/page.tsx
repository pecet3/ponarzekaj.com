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
    where:{
      name: decodeURI(name)
    }
  })

  const user = data[0]


  const posts = await db.post.findMany({
    where:{
      authorId: user.id
    },
    include: {
      comments: true,
      author: true,
    },
  })

  if(data.length === 0)return <Error />

  return <main className="flex flex-col min-h-screen m-auto mt-8 justify-start items-center">
    <section className="rounded-md bg-indigo-400 flex flex-col shadow-lg shadow-indigo-600 max-w-3xl">
    <div className="relative">
      <Image src={user.backgroundImage ?? ""} alt={`zdjęcie ${user.name}`} height={96} width={96} className="h-96 rounded-t-md  w-screen"/>
    <Image src={user.image ?? ""} alt={`zdjęcie ${user.name}`} height={256} width={256} className="absolute rounded-full w-40 h-40 left-3 bottom-[-5rem] "/>
    </div>
    <span className="flex justify-center flex-col ml-48">
      <p className="text-2xl text-slate-800">{user.name}</p>
      <p className="text-xl text-slate-600">{user.email}</p>
    </span>
<div className="mt-10">
  {posts.map((post)=>{
    return <PostView post={post} key={post.id} />
  })}
</div>
    </section>
  </main>;
};

export default page;
