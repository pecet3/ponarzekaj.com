"use client";

import { FC, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BsCaretRightSquareFill, BsCaretLeftSquareFill } from "react-icons/bs";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import Image from "next/image";
import { SearchResults } from "./SearchResults";
interface PageProps {}

export const SearchUser: FC<PageProps> = ({}) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<User[] | null>(null);
  const searchHandle = async () => {
    {
      try {
        const users = await db.user.findMany({
          where: {
            name: input,
          },
        });
        setResults(users);
      } catch (error) {}
    }
  };
  return (
    <section>
      <div>
        <input className="rounded-lg " value={input} />
        <button onClick={searchHandle}></button>
      </div>
      <div>
        {results
          ? results.map((user) => (
              <div key={user.id}>
                <Image
                  className="rounded-full h-12 w-12"
                  width={48}
                  height={48}
                  alt="zdjęcie użytkownika"
                  src={user.image ?? ""}
                />
              </div>
            ))
          : null}
      </div>
      <SearchResults name={input} />
    </section>
  );
};
