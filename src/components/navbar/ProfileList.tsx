"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FunctionComponent } from "react";

export const ProfileList: FunctionComponent<{ username: string | null }> = ({
  username,
}) => {
  return (
    <ul
      tabIndex={0}
      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
    >
      <li>
        <Link href={`/profile/${username}`}>Profil</Link>
      </li>
      <li>
        <Link href={`/profile/edit`}>Edytuj</Link>
      </li>
      <li>
        <button onClick={() => signOut()}>Wyloguj się</button>
      </li>
    </ul>
  );
};
