"use client";
import { FC, useState } from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
interface PageProps {}

export const SearchUser: FC<PageProps> = ({}) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<User[] | null>(null);

  const searchHandle = async () => {
    {
      try {
        const response = await axios.get(`api/user/get-by-name?name=${input}`);

        setResults(response.data);
      } catch {
        toast.error("Ups...coś poszło nie tak");
      }
    }
  };

  return (
    <>
      <div className="flex gap-1">
        <input
          className="rounded-lg p-1"
          value={input}
          type="text"
          placeholder="Wyszukaj użytkownika 🔍"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (input !== "") {
                searchHandle();
              }
            }
          }}
        />
        {/* <button
          onClick={searchHandle}
          className="rounded-lg bg-slate-300 text-black px-1 hover:bg-slate-100 duration-300 hover:rounded-md"
        >
          Szukaj 🔍
        </button> */}
      </div>
      <ul className="flex flex-col gap-2  overflow-y-scroll overflow-hidden">
        {results
          ? results.map((user) => (
              <li
                className="list-none flex flex-col justify-center items-center mr-3"
                key={user.id}
              >
                <Link
                  href={`/profile/${user.name}`}
                  className="bg-sky-900 text-slate-200 rounded-lg
               shadow-md shadow-gray-800 w-full px-1 sm:p-2 flex flex-col gap-2 items-center"
                >
                  <Image
                    src={user.image ?? ""}
                    width={96}
                    height={96}
                    className="rounded-full h-8 w-8 sm:h-12 sm:w-12"
                    alt="Zdjęcie użytkownika"
                  />

                  <span>
                    <p className="text-lg sm:text-xl font-semibold m-0">
                      {user.name}
                    </p>
                    <p className="text-base sm:text-sm text-slate-400 m-0">
                      {user.email}
                    </p>
                  </span>
                </Link>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};
