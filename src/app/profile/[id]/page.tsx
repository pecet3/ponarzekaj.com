import React from "react";
import { db } from "@/lib/db";
interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const data = await db.user.findUnique({
    where:{
      id: id
    }
  })
  console.log(data)
  return <main className="flex flex-col background min-h-screen">{id}</main>;
};

export default page;
