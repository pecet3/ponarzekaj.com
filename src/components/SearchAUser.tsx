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
        const response = await axios.get(`api/user/get-by-name?user=${input}`);

        setResults(response.data);
      } catch {
        toast.error("Ups...coś poszło nie tak");
      }
    }
  };

  return (
    <section>
      <div className="flex">
        <input
          className="rounded-lg p-1"
          value={input}
          type="text"
          placeholder="Wyszukaj użytkownika 🔍"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={searchHandle}>szukaj</button>
      </div>
      <div>
        {results
          ? results.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.name}`}
                className="flex gap-2"
              >
                <Image
                  className="rounded-full h-12 w-12"
                  width={48}
                  height={48}
                  alt="zdjęcie użytkownika"
                  src={user.image ?? ""}
                />
                {user.name}
              </Link>
            ))
          : null}
      </div>
    </section>
  );
};
