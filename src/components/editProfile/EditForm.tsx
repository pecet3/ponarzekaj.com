"use client";
import React from "react";
import type { User } from "@prisma/client";
import { SubmitButton } from "../SubmitButton";

import { FunctionComponent } from "react";
import Image from "next/image";

export const EditForm: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <form className="flex flex-col justify-center mx-auto gap-2 sm:bg-transparent bg-slate-700 rounded-md items-center">
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
      <div className="flex flex-col sm:ml-48 ml-36 mt-2 text-slate-200 break-words">
        <span className="flex justify-between items-end">
          <p className="text-xl sm:text-2xl  font-bold">{user.name}</p>
        </span>
        <p className="text-base sm:text-xl ">{user.email}</p>
      </div>
      <input
        type="text"
        name="name"
        placeholder={user.name || "Wpisz swoje imię"}
        className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-slate-800 text-black"
      />
      <input
        type="email"
        name="email"
        placeholder={user.email || "Wpisz swoje imię"}
        className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-slate-800 text-black"
      />
      <textarea
        placeholder="Twój opis"
        name="description"
        rows={2}
        autoFocus={true}
        className="rounded-md placeholder:p-1 bg-slate-400 placeholder:text-slate-800 text-black resize-none w-full"
      />
      <SubmitButton />
    </form>
  );
};
