import React from "react";
import { db } from "@/lib/db";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { MainTile } from "@/components/MainTile";
import { Icons } from "@/components/ui/Icons";
import { Error } from "@/components/Error";




const page= async () => {
  


  const session = await getAuthSession();
 
  const user = await db.user.findUnique({
    where: {
      id:session?.user.id
    },
  });

  if (!user || !session) return <Error />;
 



  // const handleImageChange = (event) => {
  //   setBackgroundImage(URL.createObjectURL(event.target.files[0]));
  // };

  return (
    <MainTile>
      <div className="relative">
        <Image
          src={user.backgroundImage}
          alt={`Background image for ${user.name}`}
          height={1280}
          width={720}
          className="h-56 sm:h-96 sm:rounded-t-xl  w-screen"
        />
        <label htmlFor="backgroundImage" className="absolute bottom-0 right-0 p-2 cursor-pointer">
          <Icons.Image size={20} className="text-blue-400" />
        </label>
        <input
          id="backgroundImage"
          type="file"
          accept="image/*"
          
          className="hidden"
        />
      </div>
      {/* Add more form fields for other editable properties here */}
    </MainTile>
  );
};

export default page;