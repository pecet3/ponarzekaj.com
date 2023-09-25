import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "../ui/Icons";
import { ProfileList } from "./ProfileList";
import { db } from "@/lib/db";
import { NotificationView } from "../NotificationView";
import { revalidatePath } from "next/cache";
import { Error } from "../Error";

export const Navbar = async () => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session ? session?.user.id : "",
    },
    include: {
      notifications: {
        orderBy: [{ createdAt: "desc" }],
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

  async function markVisitedNotificationsAsTrue() {
    "use server";
    if (visitedNotificationsLength > 0) {
      await db.notification.updateMany({
        where: {
          userId: session?.user.id,
        },
        data: {
          visited: true,
        },
      });
    }
    revalidatePath("/");
  }
  if (!user && session?.user.id) return <Error />;
  return (
    <nav className="navbar bg-slate-700 text-slate-200 p-0.5">
      <div className="flex-1">
        <Link className="" href="/profile/edit">
          <img
            src="/logo.png"
            alt="logo"
            className="h-16 w-auto hidden sm:block"
          />
          <img
            className="h-16 w-auto flex sm:hidden"
            src="/logo_mobile.png"
            alt="logo"
          />
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
            <Link href="/friends">
              <Icons.Friend size={32} />
            </Link>
            <form action={markVisitedNotificationsAsTrue}>
              <button type="submit">
                <div className="dropdown dropdown-end bg-slate-700">
                  <label
                    tabIndex={0}
                    className="relative btn btn-ghost btn-circle"
                  >
                    <div className="m-auto">
                      <Icons.Notification size={32} />
                    </div>
                    {visitedNotificationsLength > 0 ? (
                      <p className="absolute z-10 top-2 right-2 rounded-full text-xs px-1 text-slate-100 bg-red-700">
                        {visitedNotificationsLength}
                      </p>
                    ) : null}
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu-sm dropdown-content bg-base-100 rounded-box w-64 flex-col flex gap-1 max-h-80 overflow-y-scroll"
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
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="w-10 rounded-full">
                  <Image
                    src={session.user.image ?? ""}
                    height={96}
                    width={96}
                    alt="Twój awatar"
                    className="rounded-full"
                  />
                </div>
              </label>

              <ProfileList username={user?.name ?? ""} />
            </div>
          </>
        ) : (
          <Link
            className="rounded-lg p-1 text-xl bg-blue-700 text-slate-100 font-semibold hover:bg-blue-600 duration-300 ring-1 ring-blue-600 mr-2"
            href="/auth"
          >
            Zaloguj się
          </Link>
        )}
      </div>
    </nav>
  );
};
