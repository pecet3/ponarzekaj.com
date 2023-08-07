"use client";
import { FunctionComponent } from "react";
import { Icons } from "../ui/Icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const AddLikeDeleteComment: FunctionComponent<{
  isLiked: boolean;
  isUserPost: boolean;
  postId: string;
  userId: string | undefined;
}> = ({ isLiked, isUserPost, postId, userId }) => {
  const router = useRouter();

  const addLikeHandle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await axios.post("/api/post/add-like", {
        postId: postId,
        userId: userId,
      });

      toast.success("Polubiłeś post!");

      router.refresh();
    } catch (err) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  const deleteLikeHandle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await axios.post("/api/post/delete-like", {
        postId: postId,
        userId: userId,
      });

      toast.success("Usunąłeś polubienie pod postem!");

      router.refresh();
    } catch (err) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  return (
    <>
      <div className="m-auto mb-1 mr-1 flex justify-end gap-2">
        {isUserPost ? (
          <button className="flex items-center gap-1 text-sm text-gray-500 ">
            <Icons.Delete size={16} className="text-red-400" /> Usuń
            <i className="text-xs font-extralight text-slate-200">{`∙`}</i>
          </button>
        ) : null}
        {!isLiked ? (
          <button
            className=" flex items-center justify-center text-xs rounded-xl px-1 bg-slate-200 text-black"
            onClick={addLikeHandle}
          >
            <Icons.Like size={16} className="text-blue-500" /> Lubię to
          </button>
        ) : (
          <button
            className=" flex items-center justify-center text-xs rounded-xl px-1 bg-slate-300 text-black"
            onClick={deleteLikeHandle}
          >
            <Icons.Like size={16} className="text-blue-800" /> Polubiono
          </button>
        )}
        <Link
          href={`/post/${postId}`}
          className="flex items-center justify-center text-xs rounded-xl px-1 bg-slate-900"
        >
          <Icons.AddComment size={16} className="text-green-500" /> Skomentuj
        </Link>
      </div>
    </>
  );
};
