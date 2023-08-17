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
      notifications: true,
    },
  });

  console.log(user?.notifications);
  return (
    <nav className="navbar bg-slate-700 text-slate-200">
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
            <div className="dropdown dropdown-end bg-slate-700">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Icons.Comments size={24} />
                </div>
              </label>
              {user?.notifications.map((notification) => (
                <NotificationView
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          </>
        ) : (
          <Link
            className="rounded-md p-1 text-xl bg-blue-600 text-slate-300 font-semibold hover:bg-sky-600 duration-300"
            href="/sign-in"
          >
            Zaloguj się
          </Link>
        )}
      </div>
    </nav>
  );
};
