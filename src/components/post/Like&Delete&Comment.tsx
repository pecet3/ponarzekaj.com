"use client";
import { FunctionComponent } from "react";
import { Icons } from "../ui/Icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addALike, deleteALike, deleteAPost } from "../../next_actions/post";

export const AddLikeDeleteComment: FunctionComponent<{
  isLiked: boolean;
  isUserPost: boolean;
  postId: string;
  userId: string | undefined;
}> = ({ isLiked, isUserPost, postId, userId }) => {
  const router = useRouter();

  const addLikeHandle = async () => {
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

  const deleteLikeHandle = async () => {
    try {
      await axios.post("/api/post/delete-like", {
        postId: postId,
        userId: userId,
      });

      toast.success("Usunąłeś polubienie!");

      router.refresh();
    } catch (err) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  const deletePostHandle = async () => {
    try {
      await axios.post("/api/post/delete", {
        postId: postId,
        userId: userId,
      });

      toast.success("Usunąłeś post!");

      router.refresh();
    } catch (err) {
      toast.error("Ups...Coś poszło nie tak");
    }
  };

  return (
    <>
      <div className="m-auto mr-1 flex justify-end gap-2 text-xs">
        {isUserPost ? (
          <form
            action={async () => {
              const { error, success } = await deleteAPost(postId);
              if (success) {
                return toast.success("Usunąłeś post");
              }
              if (error) {
                return toast.error("Ups...Coś poszło nie tak");
              }
            }}
          >
            <button
              className="flex items-center gap-1 text-gray-500 "
              type="submit"
            >
              <Icons.Delete size={16} className="text-red-400" /> Usuń
              <i className="text-xs font-extralight text-slate-200">{`∙`}</i>
            </button>
          </form>
        ) : null}
        {!isLiked ? (
          <form
            action={async () => {
              const { error, success } = await addALike(postId);
              if (success) {
                return toast.success("Polubiłeś post!");
              }
              if (error) {
                return toast.error("Ups...Coś poszło nie tak");
              }
            }}
          >
            <button
              className=" flex items-center justify-center rounded-xl px-1 py-0.5 bg-slate-200 dark text-black dark:bg-blue-900 dark:text-white"
              type="submit"
            >
              <Icons.Like size={16} className="text-blue-500" /> Lubię to
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              const { error, success } = await deleteALike(postId);
              if (success) {
                return toast.success("Polubiłeś post!");
              }
              if (error) {
                return toast.error("Ups...Coś poszło nie tak");
              }
            }}
          >
            <button
              className=" flex items-center justify-center rounded-xl px-1 py-0.5 dark:bg-slate-2400 dark:text-black bg-blue-900 text-white"
              type="submit"
            >
              <Icons.Like size={16} className="text-blue-500" /> Polubiono
            </button>
          </form>
        )}
        <Link
          href={`/post/${postId}`}
          className="flex items-center justify-center  rounded-xl px-1 py-0.5 bg-slate-200 text-black"
        >
          <Icons.AddComment size={16} className="text-slate-800" /> Skomentuj
        </Link>
      </div>
    </>
  );
};
