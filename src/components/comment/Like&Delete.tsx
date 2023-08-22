"use client";
import { FunctionComponent } from "react";
import { Icons } from "../ui/Icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const AddLikeDelete: FunctionComponent<{
  isLiked: boolean;
  isUserComment: boolean;
  commentId: string;
  userId: string | undefined;
}> = ({ isLiked, commentId, isUserComment, userId }) => {
  const router = useRouter();

  const addLikeHandle = async () => {
    try {
      await axios.post("/api/comment/add-like", {
        commentId,
        userId,
      });

      toast.success("Polubiłeś komentarz!");

      router.refresh();
    } catch (err) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  const deleteLikeHandle = async () => {
    try {
      await axios.post("/api/comment/delete-like", {
        commentId,
        userId,
      });

      toast.success("Usunąłeś polubienie!");

      router.refresh();
    } catch (err) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  const deleteCommentHandle = async () => {
    try {
      await axios.post("/api/comment/delete", {
        commentId,
        userId,
      });

      toast.success("Usunąłeś komentarz!");

      router.refresh();
    } catch (err) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  return (
    <>
      <div className="m-auto mr-1 flex justify-end gap-2">
        {isUserComment ? (
          <button
            className="flex items-center gap-1 text-sm text-gray-500 "
            onClick={deleteCommentHandle}
          >
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
            className=" flex items-center justify-center text-xs rounded-xl px-1 bg-blue-900 text-white"
            onClick={deleteLikeHandle}
          >
            <Icons.Like size={16} className="text-blue-500" /> Polubiono
          </button>
        )}
      </div>
    </>
  );
};
