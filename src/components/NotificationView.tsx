import { FunctionComponent } from "react";
import { Notification } from "@prisma/client";
import Link from "next/link";
import { db } from "@/lib/db";
import Image from "next/image";

export const NotificationView: FunctionComponent<{
  notification: Notification;
}> = async ({ notification }) => {
  const author = await db.user.findUnique({
    where: {
      id: notification.authorId,
    },
  });
  await db.notification.update({
    where: {
      id: notification.id,
    },
    data: {
      visited: true,
    },
  });
  if (!author) return null;
  return (
    <li
      className={`rounded-lg ${
        notification.visited
          ? "bg-slate-600 hover:bg-slate-700"
          : "bg-slate-700 hover:bg-slate-800"
      } duration-300 m-auto`}
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
