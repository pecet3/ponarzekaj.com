import { FunctionComponent } from "react";
import { Icons } from "./ui/Icons";

interface PageProps {
  likesLength: number;
  commentsLength: number;
}

export const LikesCommentsInfo: FunctionComponent<PageProps> = ({
  likesLength,
  commentsLength,
}) => {
  return (
    <div className="bg-blue-950 text-slate-200 rounded-xl px-1 flex py-0.5 gap-1 font-semibold">
      <span className="flex">
        <Icons.Like size={16} className=" text-blue-500 mr-0.5" />
        {likesLength}
      </span>
      |
      <span className="flex">
        <Icons.Comments size={16} className="mr-1 text-emerald-500" />
        {commentsLength}
      </span>
    </div>
  );
};
