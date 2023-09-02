"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import type { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import UploadthingButton from "../UploadthingButton";
import { createAPost } from "@/lib/actions";

const emojiList = [
  {
    value: "😐",
    id: 1,
  },
  {
    value: "😠",
    id: 2,
  },
  {
    value: "😡",
    id: 3,
  },
  {
    value: "🤬",
    id: 4,
  },
];
export type PostInput = {
  content: string;
  emoji: string;
};
export const CreatePost: React.FC<{ user: User | null }> = ({ user }) => {
  const [input, setInput] = useState<PostInput>({
    content: "",
    emoji: "😐",
  });
  const [counter, setCounter] = useState<number>(input.content.length);
  const [isFile, setIsFile] = useState(false);
  const maxInputLength = 280;

  useEffect(() => {
    setCounter(input.content.length);
  }, [input]);

  if (!user) return null;
  return (
    <form
      action={async (formData) => createAPost(formData, input)}
      className="flex w-full items-center justify-center gap-1 bg-slate-800 md:gap-2 sm:rounded-t-xl max-w-3xl
     p-2 border-b-2 border-slate-400 sm:border-t-0 border-t"
    >
      <Link href={`/profile/${user?.name}`}>
        <Image
          src={user?.image || ""}
          className={`h-12 w-12 rounded-full md:h-16 md:w-16 ${
            input.content ? "hidden md:flex" : ""
          }`}
          alt="Your profile photo"
          width={96}
          height={96}
        />
      </Link>

      <textarea
        placeholder="Wyrzuć swoje frustracje...śmiało"
        name="text"
        rows={2}
        autoFocus={true}
        className="grow bg-transparent outline-none resize-none placeholder:italic text-slate-200"
        value={input.content}
        onChange={(e) =>
          setInput(
            (prev) =>
              (prev = {
                ...prev,
                content: e.target.value,
              })
          )
        }
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     e.preventDefault();
        //     if (input.content !== "") {
        //       handleSubmit(e);
        //     }
        //   }
        // }}
      />
      {input.content !== "" ? (
        <>
          <div className="flex flex-col items-center gap-1 self-end">
            <div className="m-auto flex flex-wrap justify-center rounded-lg bg-slate-600">
              {emojiList.map((emoji) => (
                <label
                  key={emoji.id}
                  className={`flex items-center space-x-2 hover:cursor-pointer ${
                    emoji.value === input.emoji ? "rounded-md bg-slate-400" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="emoji"
                    value={emoji.value}
                    checked={emoji.value === input.emoji}
                    onChange={() =>
                      setInput((prev) => ({
                        ...prev,
                        emoji: emoji.value,
                      }))
                    }
                    className="hidden"
                  />
                  {emoji.value}
                </label>
              ))}
            </div>
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="flex justify-between items-center w-full">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={counter > maxInputLength}
                >
                  Dodaj
                </button>
                <label className="text-xl">
                  {isFile ? " ✅" : "📷"}
                  <input
                    name="files"
                    type="file"
                    className="hidden"
                    onChange={() => setIsFile(true)}
                  />
                </label>
              </div>

              <p
                className={`text-[10px] text-slate-200 w-8 ${
                  counter > maxInputLength ? "text-red-400" : ""
                }`}
              >
                {counter}/{maxInputLength}
              </p>
            </div>
          </div>
        </>
      ) : null}
    </form>
  );
};

//   const handleSubmit = async (
//     e:
//       | React.MouseEvent<HTMLButtonElement, MouseEvent>
//       | React.KeyboardEvent<HTMLTextAreaElement>
//   ) => {
//     try {
//       await axios.post("/api/post/create", {
//         content: input.content,
//         emoji: input.emoji,
//         authorId: user?.id,
//       });
//       toast.success("Dodałeś Post!");
//       setInput(
//         (prev) =>
//           (prev = {
//             ...prev,
//             content: "",
//           })
//       );
//       router.refresh();
//     } catch (error) {
//       toast.error("Ups...Coś poszło nie tak");
//     }
//   };
