import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "../ui/Icons";
import { ProfileList } from "./ProfileList";
import { db } from "@/lib/db";
import { NotificationView } from "../NotificationView";

export const Navbar = async () => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session ? session?.user.id : "",
    },
    include: {
      notifications: {
        take: 10,
      },
    },
  });

  const visitedNotifications = await db.notification.findMany({
    where: {
      userId: session?.user.id,
      visited: false,
    },
  });

  const visitedNotificationsLength = visitedNotifications.length;

  async function markVisitedNotificationAsTrue() {
    "use server";
    await db.notification.updateMany({
      where: {
        userId: session?.user.id,
      },
      data: {
        visited: true,
      },
    });
  }

  return (
    <nav className="navbar bg-slate-700 text-slate-200 p-0 sm:p-1">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl p-1 sm:p-2" href="/">
          ponarzekaj.com
        </Link>
      </div>
      {/* <div className="flex justify-end mr-1">
        <Link className="btn btn-ghost normal-case text-lg" href="/chat">
          <Icons.Chat size={24} />
          Chat
        </Link>
      </div> */}
      <div className="flex-none gap-2">
        {session ? (
          <>
            <form action={markVisitedNotificationAsTrue}>
              <button type="submit">
                <div className="dropdown dropdown-end bg-slate-700">
                  <label
                    tabIndex={0}
                    className="relative btn btn-ghost btn-circle avatar"
                  >
                    <div className="m-auto">
                      <Icons.Notification size={32} />
                    </div>
                    {true ? (
                      <p className="absolute z-10 top-2 right-2 rounded-full px-0.5 text-slate-100 bg-red-700">
                        {visitedNotificationsLength}
                      </p>
                    ) : null}
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu-sm dropdown-content bg-base-100 rounded-box w-64 flex-col flex gap-1"
                  >
                    {user?.notifications.map((notification) => (
                      <NotificationView
                        key={notification.id}
                        notification={notification}
                      />
                    ))}
                  </ul>
                </div>
              </button>
            </form>

            <div className="dropdown dropdown-end bg-slate-700">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={session.user.image ?? ""}
                    height={96}
                    width={96}
                    alt="Your avatar"
                  />
                </div>
              </label>

              <ProfileList username={user?.name ?? "Ja kub"} />
            </div>
          </>
        ) : (
          <Link className="majorButton mr-2" href="/sign-in">
            Zaloguj się
          </Link>
        )}
      </div>
    </nav>
  );
};
