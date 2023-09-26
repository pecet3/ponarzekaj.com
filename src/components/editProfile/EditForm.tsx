"use client";
import React from "react";
import type { User } from "@prisma/client";
import { SubmitButton } from "../SubmitButton";

import { FunctionComponent } from "react";
import Image from "next/image";

export const EditForm: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <form className="mt-12 flex flex-col justify-center mx-auto gap-2 sm:bg-transparent bg-slate-700 rounded-md p-2 items-center">
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
      <Image
        src={user.backgroundImage ?? ""}
        alt={`zdjęcie ${user.name}`}
        height={640}
        width={360}
        className="rounded-sm w-32 h-16"
      />
      <Image
        src={user.image ?? ""}
        alt={`zdjęcie ${user.name}`}
        height={200}
        width={200}
        className="rounded-full w-16 h-16"
      />
      <SubmitButton />
    </form>
  );
};
