import { FunctionComponent } from "react";
import { Notification } from "@prisma/client";
import Link from "next/link";
export const NotificationView: FunctionComponent<{
  notification: Notification;
}> = ({ notification }) => {
  return (
    <div className="rounded-lg bg-slate-700 flex gap-2 ">
      <p>{notification.content}</p>
      <Link href={notification.link ?? "Wejdź"}></Link>
    </div>
  );
};
