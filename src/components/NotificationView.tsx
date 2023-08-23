import { FunctionComponent } from "react";
import { Notification } from "@prisma/client";
import Link from "next/link";
import { db } from "@/lib/db";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";

export const NotificationView: FunctionComponent<{
  notification: Notification;
}> = async ({ notification }) => {
  const session = await getAuthSession();
  const author = await db.user.findUnique({
    where: {
      id: notification.authorId,
    },
  });

  if (!author || !session) return null;
  return (
    <li
      className={`rounded-lg  duration-300 m-0 text-sm 
      ${
        !notification.visited
          ? "text-slate-800 hover:bg-slate-300 bg-slate-200"
          : "bg-slate-700 hover:bg-slate-600"
      }`}
    >
      <Link
        href={`${notification.link}?notificationId=${notification?.id}` ?? "/"}
        className="flex justify-between gap-2 items-center"
      >
        <Image
          src={author?.image ?? ""}
          height={64}
          width={64}
          alt="zdjęcie osoby odpowiedzialnej za powiadomienie"
          className="rounded-full w-8 h-8"
        />
        <p>
          {author?.name} {notification.content}
        </p>
      </Link>
    </li>
  );
};
