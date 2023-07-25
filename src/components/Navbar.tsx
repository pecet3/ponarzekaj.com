import { getAuthSession } from "../lib/auth";
import Link from "next/link";
import Image from "next/image";
export const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <nav className="navbar bg-base-100 text-slate-200">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          ponarzekaj.com
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
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
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
