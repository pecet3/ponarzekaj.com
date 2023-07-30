import React from "react";
import { db } from "@/lib/db";
import Error from "@/components/Error";
import Image from "next/image";
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
  if(data.length === 0)return <Error />
  const user = data[0]
  return <main className="flex flex-col min-h-screen m-auto mt-8 justify-start items-center">
    <section className="rounded-md bg-indigo-400 p-1 sm:p-2 flex flex-col shadow-lg shadow-indigo-600 max-w-3xl">
    <div className="relative">
      <Image src={user.backgroundImage ?? ""} alt={`zdjęcie ${user.name}`} height={96} width={96} className="h-96   w-screen"/>
    <Image src={user.image ?? ""} alt={`zdjęcie ${user.name}`} height={96} width={96} className="absolute rounded-full w-32 h-32 left-3 bottom-0  "/>
  {/* <span className="flex justify-center flex-col">
  <p className="text-2xl text-slate-800">{user.name}</p>
  <p className="text-xl text-slate-600">{user.email}</p>
  </span> */}
    </div>
    </section>
  </main>;
};

export default page;
