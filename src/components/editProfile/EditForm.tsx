"use client";
import React from "react";
import type { User } from "@prisma/client";
import { SubmitButton } from "../SubmitButton";

import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { Icons } from "../ui/Icons";

export const EditForm: FunctionComponent<{ user: User }> = ({ user }) => {
  const [isFile, setIsFile] = useState({
    avatar: false,
    background: false,
  });
  return (
    <form className="mt-12 flex justify-center mx-auto gap-2 sm:bg-transparent bg-slate-700 rounded-md p-2 items-center">
      <div className="flex gap-2 flex-col">
        <Image
          src={user.image ?? ""}
          alt={`zdjęcie ${user.name}`}
          height={200}
          width={200}
          className="rounded-full w-16 h-16"
        />
        <label className="hover:cursor-pointer">
          <div className="">
            {isFile.avatar ? (
              <Icons.Confirm size={20} className="text-green-600" />
            ) : (
              <Icons.Image size={20} />
            )}
          </div>
          <input
            name="files"
            type="file"
            className="hidden"
            onChange={() =>
              setIsFile(
                (prev) =>
                  (prev = {
                    ...prev,
                    avatar: true,
                  })
              )
            }
          />
        </label>
        <Image
          src={user.backgroundImage ?? ""}
          alt={`zdjęcie ${user.name}`}
          height={640}
          width={360}
          className="rounded-sm w-32 h-16"
        />
      </div>
      <div className="flex flex-col gap-2">
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
      </div>
      {/* zrobić żeby można było dodawać klasy do komponentu */}
      <div className="flex-wrap">
        <SubmitButton />
      </div>
    </form>
  );
};
