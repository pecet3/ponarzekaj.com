import { getAuthSession } from "../lib/auth";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "./ui/Icons";
import { ProfileList } from "./ui/ProfileList";
import { db } from "@/lib/db";

export const Navbar = async () => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session ? session?.user.id : "",
    },
  });
  return (
    <nav className="navbar bg-base-100 text-slate-200">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          ponarzekaj.com
        </Link>
      </div>
      <div className="flex justify-end mr-1">
        <Link className="btn btn-ghost normal-case text-lg" href="/chat">
          <Icons.Chat size={24} />
          Chat
        </Link>
      </div>
      <div className="flex-none gap-2">
        {session ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={session.user.image ?? ""}
                  height={16}
                  width={16}
                  alt="Your avatar"
                />
              </div>
            </label>
            <ProfileList username={user?.name ?? "Ja kub"} />
          </div>
        ) : (
          <div className="flex-1">
            <Link
              className="btn btn-primary normal-case text-xl"
              href="/sign-in"
            >
              Zaloguj się
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
